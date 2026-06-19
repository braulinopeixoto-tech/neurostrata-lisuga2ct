param(
  [Parameter(Mandatory = $true)]
  [string]$ManifestPath
)

$ErrorActionPreference = "Stop"

function Write-LeanFreezeLog($Message) {
  Write-Output $Message
}

function Block-LeanFreeze($Code) {
  Write-Error $Code
  exit 1
}

function Write-CleanCloneGuidance($Manifest) {
  Write-LeanFreezeLog "Permissao Git quebrada no clone limpo atual. Use novo clone limpo:"
  Write-LeanFreezeLog "powershell -NoProfile -ExecutionPolicy Bypass -File `"$($Manifest.sourceRepo)\scripts\sensetrust-clean-clone-bootstrap-lean-v12.ps1`" -RepoRoot `"$($Manifest.cleanRepo)`" -BaseBranch `"$($Manifest.baseBranch)`" -InstallDependencies"
}

function Test-NotRunningFromSystem32 {
  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") {
    Block-LeanFreeze "LEAN_FREEZE_BLOCKED_running_from_system32"
  }
}

function Test-CleanRepo($Manifest) {
  if (!(Test-Path -LiteralPath $Manifest.cleanRepo)) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_clean_repo_not_found" }
  if (!(Test-Path -LiteralPath (Join-Path $Manifest.cleanRepo ".git"))) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_not_git_repo" }
}

function Test-SourceRepo($Manifest) {
  if (!(Test-Path -LiteralPath $Manifest.sourceRepo)) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_source_repo_not_found" }
}

function Test-Manifest($Path) {
  if (!(Test-Path -LiteralPath $Path)) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_manifest_not_found" }
}

function Test-GitAvailable {
  git --version | Out-Null
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_git_not_available" }
}

function Test-NodeAvailable {
  node --version | Out-Null
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_node_not_available" }
}

function Test-NpmAvailable {
  npm.cmd --version | Out-Null
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_npm_not_available" }
}

function Test-DependenciesInstalled($Manifest) {
  $nodeModules = Join-Path $Manifest.cleanRepo "node_modules"
  $viteBin = Join-Path $Manifest.cleanRepo "node_modules\.bin\vite.cmd"
  if (!(Test-Path -LiteralPath $nodeModules) -or !(Test-Path -LiteralPath $viteBin)) {
    Write-LeanFreezeLog "Dependências ausentes no clone limpo. Rode: npm.cmd install --legacy-peer-deps --no-audit --no-fund"
    Block-LeanFreeze "LEAN_FREEZE_BLOCKED_missing_dependencies_run_npm_install_legacy_peer_deps"
  }
  Write-LeanFreezeLog "LEAN_DEPENDENCIES_READY"
}

function Test-BuildToolAvailable($Manifest) {
  $packageJson = Join-Path $Manifest.cleanRepo "package.json"
  if (!(Test-Path -LiteralPath $packageJson)) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_missing_dependencies_run_npm_install_legacy_peer_deps" }
}

function Clear-LeanGeneratedPackageLockIfUntracked {
  $tracked = git ls-files --error-unmatch package-lock.json 2>$null
  if ($LASTEXITCODE -ne 0 -and (Test-Path -LiteralPath "package-lock.json")) {
    Remove-Item -LiteralPath "package-lock.json" -Force
  }
}

function Get-LeanFreezeManifest($Path) {
  Test-Manifest $Path
  $manifest = Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json
  foreach ($field in @("sprintName","baseBranch","sprintBranch","commitMessage","sourceRepo","cleanRepo","primaryTest","obsidianScript","expectedRootNote","buildCommand","expectedRemoteBranch","files","regressionTests")) {
    if (-not $manifest.PSObject.Properties.Name.Contains($field) -or [string]::IsNullOrWhiteSpace([string]$manifest.$field)) {
      Block-LeanFreeze "LEAN_FREEZE_BLOCKED_manifest_not_found"
    }
  }
  return $manifest
}

function Test-ManifestFilesExistInSourceRepo($Manifest) {
  foreach ($file in $Manifest.files) {
    if (!(Test-Path -LiteralPath (Join-Path $Manifest.sourceRepo $file))) {
      Block-LeanFreeze "LEAN_FREEZE_BLOCKED_manifest_file_missing_in_source_repo"
    }
  }
}

function Test-BaseBranchExists($Manifest) {
  Set-Location -LiteralPath $Manifest.cleanRepo
  $fetchOutput = git fetch origin 2>&1
  if ($LASTEXITCODE -ne 0) {
    if (($fetchOutput -join "`n") -match "FETCH_HEAD|Permission denied|Access is denied") { Write-CleanCloneGuidance $Manifest }
    Block-LeanFreeze "LEAN_FREEZE_BLOCKED_base_branch_missing"
  }
  $remote = git ls-remote --heads origin $Manifest.baseBranch
  if ($LASTEXITCODE -ne 0 -or !$remote) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_base_branch_missing" }
}

function Checkout-BaseBranch($Manifest) {
  Set-Location -LiteralPath $Manifest.cleanRepo
  git switch $Manifest.baseBranch
  if ($LASTEXITCODE -ne 0) { git switch -c $Manifest.baseBranch "origin/$($Manifest.baseBranch)" }
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_base_branch_missing" }
  git pull --ff-only origin $Manifest.baseBranch
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_base_branch_missing" }
}

function Create-LeanFreezeBranch($Manifest) {
  $existing = git branch --list $Manifest.sprintBranch
  if ($existing) {
    git switch $Manifest.sprintBranch
  } else {
    git switch -c $Manifest.sprintBranch
  }
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_base_branch_missing" }
}

function Copy-ManifestFiles($Manifest) {
  $copied = @()
  foreach ($file in $Manifest.files) {
    $source = Join-Path $Manifest.sourceRepo $file
    $target = Join-Path $Manifest.cleanRepo $file
    $parent = Split-Path $target -Parent
    if (!(Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
    Copy-Item -LiteralPath $source -Destination $target -Force
    $copied += $file
  }
  Write-LeanFreezeLog "LEAN_COPIED_FILES"
  $copied | ForEach-Object { Write-LeanFreezeLog $_ }
}

function Invoke-BuildCommand($Manifest) {
  Invoke-Expression $Manifest.buildCommand
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_build_failed" }
  Write-LeanFreezeLog "LEAN_BUILD_PASS"
}

function Invoke-PrimaryTest($Manifest) {
  node $Manifest.primaryTest
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_primary_test_failed" }
  Write-LeanFreezeLog "LEAN_PRIMARY_TEST_PASS"
}

function Invoke-RegressionTests($Manifest) {
  foreach ($test in $Manifest.regressionTests) {
    node $test
    if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_regression_failed" }
  }
  Write-LeanFreezeLog "LEAN_REGRESSIONS_PASS"
}

function Invoke-ObsidianScript($Manifest) {
  $scriptPath = Join-Path $Manifest.cleanRepo $Manifest.obsidianScript
  if (!(Test-Path -LiteralPath $scriptPath)) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_obsidian_failed" }
  powershell -NoProfile -ExecutionPolicy Bypass -File $scriptPath
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_obsidian_failed" }
  Write-LeanFreezeLog "LEAN_OBSIDIAN_PASS"
}

function Add-ManifestFilesToGit($Manifest) {
  foreach ($f in $Manifest.files) {
    git add -- "$f"
    if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_commit_failed" }
  }
}

function Test-BranchHasChanges {
  $status = git status --short
  if (!$status) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_empty_branch" }
}

function Commit-LeanFreeze($Manifest) {
  git commit -m $Manifest.commitMessage
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_commit_failed" }
  Write-LeanFreezeLog "LEAN_COMMIT_CREATED"
}

function Push-LeanFreezeBranch($Manifest) {
  git push -u origin $Manifest.sprintBranch
  if ($LASTEXITCODE -ne 0) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_push_failed" }
  Write-LeanFreezeLog "LEAN_PUSH_PASS"
}

function Get-LocalCommit {
  $hash = git rev-parse HEAD
  if ($LASTEXITCODE -ne 0 -or !$hash) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_commit_failed" }
  return $hash.Trim()
}

function Get-RemoteCommit($Manifest) {
  $line = git ls-remote --heads origin $Manifest.expectedRemoteBranch
  if ($LASTEXITCODE -ne 0 -or !$line) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_push_failed" }
  return (($line -split "\s+")[0]).Trim()
}

function Assert-RemoteHashMatchesLocal($LocalCommit, $RemoteCommit) {
  if ($LocalCommit -ne $RemoteCommit) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_remote_hash_mismatch" }
}

function Assert-GitStatusClean {
  $status = git status --short
  if ($status) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_git_status_not_clean" }
}

function Invoke-LeanFreeze {
  Test-NotRunningFromSystem32
  $manifest = Get-LeanFreezeManifest $ManifestPath
  Test-CleanRepo $manifest
  Test-SourceRepo $manifest
  Test-GitAvailable
  Test-NodeAvailable
  Test-NpmAvailable
  Test-DependenciesInstalled $manifest
  Test-BuildToolAvailable $manifest
  Test-ManifestFilesExistInSourceRepo $manifest
  Write-LeanFreezeLog "LEAN_PREFLIGHT_PASS"
  Test-BaseBranchExists $manifest
  Checkout-BaseBranch $manifest
  $baseCommit = Get-LocalCommit
  Create-LeanFreezeBranch $manifest
  Copy-ManifestFiles $manifest
  Invoke-BuildCommand $manifest
  Invoke-PrimaryTest $manifest
  Invoke-RegressionTests $manifest
  Invoke-ObsidianScript $manifest
  Add-ManifestFilesToGit $manifest
  Test-BranchHasChanges
  Commit-LeanFreeze $manifest
  $localCommit = Get-LocalCommit
  if ($localCommit -eq $baseCommit) { Block-LeanFreeze "LEAN_FREEZE_BLOCKED_empty_branch" }
  Push-LeanFreezeBranch $manifest
  $remoteCommit = Get-RemoteCommit $manifest
  Assert-RemoteHashMatchesLocal $localCommit $remoteCommit
  Clear-LeanGeneratedPackageLockIfUntracked
  Assert-GitStatusClean
  Write-LeanFreezeLog "LOCAL_COMMIT=$localCommit"
  Write-LeanFreezeLog "REMOTE_COMMIT=$remoteCommit"
  Write-LeanFreezeLog "LEAN_FREEZE_PASS"
}

Invoke-LeanFreeze
