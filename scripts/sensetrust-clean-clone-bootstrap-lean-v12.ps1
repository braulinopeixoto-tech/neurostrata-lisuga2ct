param(
  [string]$RepoRoot = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct",
  [string]$RemoteUrl = "https://github.com/braulinopeixoto-tech/neurostrata-lisuga2ct.git",
  [string]$BaseBranch = "chore/sensetrust-strategic-partnership-pilot-proposal-room-v37",
  [switch]$InstallDependencies
)

$ErrorActionPreference = "Stop"
$parent = Split-Path $RepoRoot -Parent
if (!(Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
if (Test-Path -LiteralPath $RepoRoot) {
  $stamp = Get-Date -Format "yyyyMMddHHmmss"
  Move-Item -LiteralPath $RepoRoot -Destination "$RepoRoot.backup.$stamp"
}
git clone $RemoteUrl $RepoRoot
if ($LASTEXITCODE -ne 0) { throw "CLEAN_CLONE_BLOCKED_clone_failed" }
Set-Location -LiteralPath $RepoRoot
git fetch origin
if ($LASTEXITCODE -ne 0) { throw "CLEAN_CLONE_BLOCKED_fetch_failed" }
git switch $BaseBranch
if ($LASTEXITCODE -ne 0) { git switch -c $BaseBranch "origin/$BaseBranch" }
if ($LASTEXITCODE -ne 0) { throw "CLEAN_CLONE_BLOCKED_base_branch_failed" }
if ($InstallDependencies.IsPresent) {
  npm.cmd install --legacy-peer-deps --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { throw "CLEAN_CLONE_BLOCKED_install_failed" }
}
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw "CLEAN_CLONE_BLOCKED_build_failed" }
Write-Output "CLEAN_CLONE_READY"
