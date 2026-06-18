param(
  [Parameter(Mandatory = $true)]
  [string]$ManifestPath
)

$ErrorActionPreference = "Stop"

function Block($Reason) {
  Write-Error "FREEZE_BLOCKED: $Reason"
  exit 1
}

function Require-Field($Manifest, $Name) {
  if (-not $Manifest.PSObject.Properties.Name.Contains($Name) -or [string]::IsNullOrWhiteSpace([string]$Manifest.$Name)) {
    Block "missing_manifest_field_$Name"
  }
}

function Run-Checked($Command, $Reason) {
  Invoke-Expression $Command
  if ($LASTEXITCODE -ne 0) { Block $Reason }
}

try {
  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") { Block "running_from_system32" }
  if (!(Test-Path -LiteralPath $ManifestPath)) { Block "manifest_not_found" }

  $manifest = Get-Content -Raw -LiteralPath $ManifestPath | ConvertFrom-Json
  @(
    "baseBranch", "sprintBranch", "sprintName", "commitMessage", "sourceRepo", "cleanRepo",
    "files", "primaryTest", "regressionTests", "buildCommand", "obsidianScript",
    "expectedRootNote"
  ) | ForEach-Object { Require-Field $manifest $_ }

  $preflight = Join-Path $manifest.sourceRepo "scripts\sensetrust-git-preflight-repair.ps1"
  if (!(Test-Path -LiteralPath $preflight)) { Block "preflight_script_not_found" }
  & powershell -ExecutionPolicy Bypass -File $preflight -CleanRepo $manifest.cleanRepo -SourceRepo $manifest.sourceRepo
  if ($LASTEXITCODE -ne 0) { Block "preflight_failed" }

  Set-Location -LiteralPath $manifest.cleanRepo
  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") { Block "running_from_system32_after_preflight" }
  if (!(Test-Path -LiteralPath ".git")) { Block "clean_repo_missing_git" }

  $initialStatus = git status --short
  if ($LASTEXITCODE -ne 0) { Block "initial_git_status_failed" }
  if ($initialStatus) { Block "clean_repo_dirty_before_copy" }

  git switch $manifest.baseBranch
  if ($LASTEXITCODE -ne 0) { Block "base_branch_switch_failed" }
  $baseHash = (git rev-parse HEAD)
  if ($LASTEXITCODE -ne 0) { Block "base_hash_failed" }

  git pull --ff-only
  if ($LASTEXITCODE -ne 0) { Block "pull_ff_only_failed" }

  $existingBranch = git branch --list $manifest.sprintBranch
  if ($existingBranch) {
    git switch $manifest.sprintBranch
  } else {
    git switch -c $manifest.sprintBranch
  }
  if ($LASTEXITCODE -ne 0) { Block "sprint_branch_switch_failed" }

  $copied = @()
  foreach ($f in $manifest.files) {
    $src = Join-Path $manifest.sourceRepo $f
    $dst = Join-Path $manifest.cleanRepo $f
    if (!(Test-Path -LiteralPath $src)) { Block "source_file_missing: $f" }
    $parent = Split-Path $dst -Parent
    if (!(Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
    Copy-Item -LiteralPath $src -Destination $dst -Force
    $copied += $f
  }
  Write-Output "COPIED_FILES"
  $copied | ForEach-Object { Write-Output $_ }

  if (!(Test-Path -LiteralPath (Join-Path $manifest.cleanRepo $manifest.primaryTest))) { Block "primary_test_missing_after_copy" }
  if (!(Test-Path -LiteralPath (Join-Path $manifest.cleanRepo $manifest.obsidianScript))) { Block "obsidian_script_missing_after_copy" }
  $typeFile = $manifest.files | Where-Object { $_ -match "^src\\types\\sensetrust\\" } | Select-Object -First 1
  if (!$typeFile -or !(Test-Path -LiteralPath (Join-Path $manifest.cleanRepo $typeFile))) { Block "type_file_missing_after_copy" }

  if ($manifest.obsidianScript -notmatch "v\d+" -or $manifest.sprintBranch -notmatch "v\d+") { Block "version_marker_missing" }
  $scriptVersion = [regex]::Match($manifest.obsidianScript, "v\d+").Value
  $branchVersion = [regex]::Match($manifest.sprintBranch, "v\d+").Value
  if ($scriptVersion -ne $branchVersion) { Block "wrong_obsidian_script_for_sprint" }

  $afterCopyStatus = git status --short
  if (!$afterCopyStatus) { Block "FREEZE_BLOCKED_BRANCH_EMPTY" }

  node $manifest.primaryTest
  if ($LASTEXITCODE -ne 0) { Block "primary_test_failed" }
  foreach ($test in $manifest.regressionTests) {
    node $test
    if ($LASTEXITCODE -ne 0) { Block "regression_failed: $test" }
  }

  Invoke-Expression $manifest.buildCommand
  if ($LASTEXITCODE -ne 0) { Block "build_failed" }

  & powershell -ExecutionPolicy Bypass -File (Join-Path $manifest.cleanRepo $manifest.obsidianScript)
  if ($LASTEXITCODE -ne 0) { Block "obsidian_script_failed" }

  foreach ($f in $manifest.files) {
    git add -- "$f"
    if ($LASTEXITCODE -ne 0) { Block "git_add_failed: $f" }
  }

  $stagedStatus = git status --short
  if (!$stagedStatus) { Block "no_changes_before_commit" }

  git commit -m $manifest.commitMessage
  if ($LASTEXITCODE -ne 0) { Block "commit_failed_or_nothing_to_commit" }
  $commitHash = (git rev-parse HEAD)
  if ($LASTEXITCODE -ne 0 -or !$commitHash) { Block "commit_hash_missing" }
  if ($commitHash -eq $baseHash) { Block "no_new_commit_differs_from_base" }

  git push -u origin $manifest.sprintBranch
  if ($LASTEXITCODE -ne 0) { Block "push_failed" }

  $finalStatus = git status --short
  if ($finalStatus) { Block "git_status_dirty_after_push" }

  git log --oneline -6
  $remoteLine = git ls-remote --heads origin $manifest.sprintBranch
  if ($LASTEXITCODE -ne 0 -or !$remoteLine) { Block "ls_remote_failed" }
  $remoteHash = ($remoteLine -split "\s+")[0]
  if ($remoteHash -ne $commitHash) { Block "remote_hash_differs_from_local_commit" }
  if ($remoteHash -eq $baseHash) { Block "remote_hash_equals_base_false_freeze" }

  Write-Output "FREEZE_PASS"
  Write-Output "LOCAL_COMMIT=$commitHash"
  Write-Output "REMOTE_COMMIT=$remoteHash"
} catch {
  if ($_.Exception.Message -notmatch "FREEZE_BLOCKED") {
    Write-Error "FREEZE_BLOCKED: $($_.Exception.Message)"
    exit 1
  }
  throw
}
