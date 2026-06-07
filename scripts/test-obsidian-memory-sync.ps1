$ErrorActionPreference = "Stop"

$VaultId = "b1a32fcb40985ffc"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$ObsidianConfig = Join-Path $env:APPDATA "Obsidian\obsidian.json"
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogDir = Join-Path $RepoRoot "docs\execution-logs"
$Log = Join-Path $LogDir "obsidian-memory-sync-$Stamp.log"
New-Item -ItemType Directory -Force $LogDir | Out-Null

function Write-Log($Message) {
  $Message | Tee-Object -FilePath $Log -Append
}

function Assert-True($Condition, $Message) {
  if (-not $Condition) {
    Write-Log "FAIL: $Message"
    throw $Message
  }
  Write-Log "OK: $Message"
}

function Get-BodyHash($Path) {
  $Text = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
  if ($Text.StartsWith("---")) {
    $End = $Text.IndexOf("`n---", 3)
    if ($End -ge 0) {
      $Text = $Text.Substring($End + 4).Trim()
    }
  }
  $Bytes = [System.Text.Encoding]::UTF8.GetBytes($Text.Trim())
  $Sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $Hash = $Sha.ComputeHash($Bytes)
    -join ($Hash | ForEach-Object { $_.ToString("x2") })
  } finally {
    $Sha.Dispose()
  }
}

Write-Log "timestamp=$Stamp"
Write-Log "vault_id=$VaultId"

Assert-True (Test-Path -LiteralPath $ObsidianConfig) "Obsidian config exists"
$Config = Get-Content -LiteralPath $ObsidianConfig -Raw | ConvertFrom-Json
$VaultPath = $Config.vaults.$VaultId.path
Assert-True ($null -ne $VaultPath -and $VaultPath.Length -gt 0) "Vault ID resolves"
Assert-True (Test-Path -LiteralPath $VaultPath) "Vault path exists: $VaultPath"
Assert-True (Test-Path -LiteralPath (Join-Path $VaultPath ".obsidian")) ".obsidian exists"

$Mocs = @(
  "00_MEMORY_INDEX/MOC_NeuroStrata.md",
  "00_MEMORY_INDEX/MOC_SenseTrust.md",
  "00_MEMORY_INDEX/MOC_Supabase.md",
  "00_MEMORY_INDEX/MOC_Codex_Sessions.md",
  "00_MEMORY_INDEX/MOC_ADR.md",
  "05_SENSETRUST/MOC_SenseTrust.md"
)

$CriticalNotes = @(
  "05_SENSETRUST/SenseTrust Layer MVP Foundation.md",
  "05_SENSETRUST/Supabase Execution Proof.md",
  "08_CODEX_RUNBOOKS/CODEX-20260606-001-SenseTrust-MVP.md",
  "09_ADR_DECISIONS/ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target.md"
)

foreach ($Relative in $Mocs) {
  Assert-True (Test-Path -LiteralPath (Join-Path $VaultPath $Relative)) "MOC exists: $Relative"
}

foreach ($Relative in $CriticalNotes) {
  $Full = Join-Path $VaultPath $Relative
  Assert-True (Test-Path -LiteralPath $Full) "Critical note exists: $Relative"
  $Text = Get-Content -LiteralPath $Full -Raw -Encoding UTF8
  Assert-True ($Text -match "## Links de memoria") "Critical note has Links de memoria: $Relative"
  Assert-True ($Text -match "\[\[MOC_") "Critical note links to at least one MOC: $Relative"
  $Hash = Get-BodyHash $Full
  Write-Log "hash $Relative $Hash"
}

$ManifestJsonPath = Join-Path $VaultPath "00_MEMORY_INDEX/MEMORY_MANIFEST.json"
Assert-True (Test-Path -LiteralPath $ManifestJsonPath) "MEMORY_MANIFEST.json exists"
$Manifest = Get-Content -LiteralPath $ManifestJsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($Relative in $CriticalNotes) {
  $Matches = @($Manifest | Where-Object { $_.note_path -eq $Relative })
  Assert-True ($Matches.Count -ge 1) "Manifest contains $Relative"
}

$LastSyncPath = Join-Path $VaultPath "00_MEMORY_INDEX/_LAST_SYNC.md"
Assert-True (Test-Path -LiteralPath $LastSyncPath) "_LAST_SYNC.md exists"
$LastSyncAge = (Get-Date) - (Get-Item -LiteralPath $LastSyncPath).LastWriteTime
Assert-True ($LastSyncAge.TotalMinutes -le 10) "_LAST_SYNC.md updated in the last 10 minutes"

$EncodedVault = [uri]::EscapeDataString($VaultId)
$EncodedFile = [uri]::EscapeDataString("00_MEMORY_INDEX/_LAST_SYNC.md")
$Uri = "obsidian://open?vault=$EncodedVault&file=$EncodedFile"
Start-Process explorer.exe $Uri
Write-Log "opened_uri=$Uri"
Write-Log "status=ok"
Write-Output "OK $Log"
