param(
  [string]$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01",
  [string]$TargetRoot = "C:\Users\User\Documents\NeuroStrata_Git",
  [string]$RemoteUrl = "https://github.com/braulinopeixoto-tech/neurostrata-lisuga2ct.git",
  [string]$BranchName = "chore/sensetrust-foundation-proof"
)

$ErrorActionPreference = "Stop"
if (Get-Variable -Name PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue) {
  $PSNativeCommandUseErrorActionPreference = $false
}

$TargetRepo = Join-Path $TargetRoot "neurostrata-lisuga2ct"
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogDir = Join-Path $SourceRepo "docs\execution-logs"
$Log = Join-Path $LogDir "git-stabilization-user-space-$Stamp.log"

New-Item -ItemType Directory -Force $LogDir | Out-Null

function Write-Log($Message) {
  $Message | Tee-Object -FilePath $Log -Append
}

function Invoke-Logged($Command, $WorkingDirectory = $null) {
  Write-Log "COMMAND: $Command"
  $Psi = New-Object System.Diagnostics.ProcessStartInfo
  $Psi.FileName = "cmd.exe"
  $Psi.Arguments = "/c $Command"
  $Psi.WorkingDirectory = if ($WorkingDirectory) { $WorkingDirectory } else { (Get-Location).Path }
  $Psi.RedirectStandardOutput = $true
  $Psi.RedirectStandardError = $true
  $Psi.UseShellExecute = $false
  $Process = New-Object System.Diagnostics.Process
  $Process.StartInfo = $Psi
  [void]$Process.Start()
  $StdOut = $Process.StandardOutput.ReadToEnd()
  $StdErr = $Process.StandardError.ReadToEnd()
  $Process.WaitForExit()
  if ($StdOut) { $StdOut.TrimEnd() | Tee-Object -FilePath $Log -Append }
  if ($StdErr) { $StdErr.TrimEnd() | Tee-Object -FilePath $Log -Append }
  if ($Process.ExitCode -ne 0) {
    throw "Command failed with exit code $($Process.ExitCode): $Command"
  }
}

function Copy-PathSelective($RelativePath) {
  $Source = Join-Path $SourceRepo $RelativePath
  $Target = Join-Path $TargetRepo $RelativePath

  if (-not (Test-Path -LiteralPath $Source)) {
    Write-Log "SKIP missing: $RelativePath"
    return
  }

  $Item = Get-Item -LiteralPath $Source
  if ($Item.PSIsContainer) {
    New-Item -ItemType Directory -Force $Target | Out-Null
    Copy-Item -LiteralPath (Join-Path $Source "*") -Destination $Target -Recurse -Force
  } else {
    New-Item -ItemType Directory -Force (Split-Path -Parent $Target) | Out-Null
    Copy-Item -LiteralPath $Source -Destination $Target -Force
  }

  Write-Log "COPIED: $RelativePath"
}

Write-Log "timestamp=$Stamp"
Write-Log "source_repo=$SourceRepo"
Write-Log "target_root=$TargetRoot"
Write-Log "target_repo=$TargetRepo"
Write-Log "remote_url=$RemoteUrl"
Write-Log "branch=$BranchName"

New-Item -ItemType Directory -Force $TargetRoot | Out-Null

if (-not (Test-Path -LiteralPath $TargetRepo)) {
  Invoke-Logged "git clone `"$RemoteUrl`" `"$TargetRepo`""
} else {
  Write-Log "Target repo already exists: $TargetRepo"
}

Invoke-Logged "git fetch origin" $TargetRepo
Invoke-Logged "git switch main" $TargetRepo
Invoke-Logged "git pull origin main" $TargetRepo

$ExistingBranches = git -C $TargetRepo branch --list $BranchName
if ($ExistingBranches) {
  Invoke-Logged "git switch `"$BranchName`"" $TargetRepo
} else {
  Invoke-Logged "git switch -c `"$BranchName`"" $TargetRepo
}

$PathsToCopy = @(
  ".neurostrata",
  "docs",
  "scripts",
  "supabase/functions",
  "supabase/migrations/20260606120000_sensetrust_layer.sql",
  "supabase/migrations/20260606133000_obsidian_note_registry.sql",
  "supabase/migrations/20260606134000_obsidian_vault_integrity_records.sql",
  "src/components/sensetrust",
  "src/services/clinical-commit-service.ts",
  "src/services/hash-service.ts",
  "src/services/report-integrity-service.ts",
  "src/services/sense-trust-service.ts",
  "src/types",
  "package.json"
)

foreach ($RelativePath in $PathsToCopy) {
  Copy-PathSelective $RelativePath
}

Write-Log "EXCLUDED: .git"
Write-Log "EXCLUDED: _codex_publish"
Write-Log "EXCLUDED: _diagnose_remote_2"
Write-Log "EXCLUDED: _diagnose_remote_3"
Write-Log "EXCLUDED: node_modules"
Write-Log "EXCLUDED: dist"
Write-Log "EXCLUDED: build"

Invoke-Logged "git status --short" $TargetRepo

$GitAddPaths = @(
  ".neurostrata",
  "docs",
  "scripts",
  "supabase/functions",
  "supabase/migrations/20260606120000_sensetrust_layer.sql",
  "supabase/migrations/20260606133000_obsidian_note_registry.sql",
  "supabase/migrations/20260606134000_obsidian_vault_integrity_records.sql",
  "src/components/sensetrust",
  "src/services/clinical-commit-service.ts",
  "src/services/hash-service.ts",
  "src/services/report-integrity-service.ts",
  "src/services/sense-trust-service.ts",
  "src/types",
  "package.json"
)

$QuotedAddPaths = $GitAddPaths | ForEach-Object { "`"$_`"" }
Invoke-Logged "git add -- $($QuotedAddPaths -join ' ')" $TargetRepo
Invoke-Logged "git commit -m `"chore: add SenseTrust foundation and Obsidian memory sync`"" $TargetRepo
Invoke-Logged "git push -u origin `"$BranchName`"" $TargetRepo
Invoke-Logged "git status --short" $TargetRepo

Write-Log "DONE target_repo=$TargetRepo branch=$BranchName"
Write-Output "DONE $Log"
