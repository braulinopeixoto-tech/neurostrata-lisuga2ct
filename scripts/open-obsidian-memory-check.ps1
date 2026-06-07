$ErrorActionPreference = "Stop"

$VaultId = "b1a32fcb40985ffc"
$Files = @(
  "00_MEMORY_INDEX/_LAST_SYNC.md",
  "05_SENSETRUST/MOC_SenseTrust.md",
  "05_SENSETRUST/Supabase Execution Proof.md"
)

foreach ($File in $Files) {
  $EncodedVault = [uri]::EscapeDataString($VaultId)
  $EncodedFile = [uri]::EscapeDataString($File)
  $Uri = "obsidian://open?vault=$EncodedVault&file=$EncodedFile"
  Start-Process explorer.exe $Uri
  Start-Sleep -Milliseconds 700
  Write-Output $Uri
}
