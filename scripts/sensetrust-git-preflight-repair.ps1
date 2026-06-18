param(
  [string]$CleanRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct",
  [string]$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
)

$ErrorActionPreference = "Stop"
$Principal = "$env:USERDOMAIN\$env:USERNAME"
$GitDir = Join-Path $CleanRepo ".git"

function Block($Reason) {
  Write-Error "PREFLIGHT_BLOCKED: $Reason"
  exit 1
}

try {
  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") { Block "running_from_system32" }
  if (!(Test-Path -LiteralPath $CleanRepo)) { Block "clean_repo_not_found: $CleanRepo" }
  if (!(Test-Path -LiteralPath $SourceRepo)) { Block "source_repo_not_found: $SourceRepo" }
  if (!(Test-Path -LiteralPath $GitDir)) { Block "git_dir_not_found: $GitDir" }

  Get-Process Obsidian,node,git,git-remote-https,git-credential-manager -ErrorAction SilentlyContinue |
    Stop-Process -Force -ErrorAction SilentlyContinue

  takeown /F "$CleanRepo" /R /D Y | Out-Null
  takeown /F "$GitDir" /R /D Y | Out-Null

  icacls "$CleanRepo" /grant "${Principal}:(OI)(CI)F" /T | Out-Null
  icacls "$GitDir" /grant "${Principal}:(OI)(CI)F" /T | Out-Null
  icacls (Join-Path $GitDir "refs") /grant "${Principal}:(OI)(CI)F" /T | Out-Null

  attrib -R "$CleanRepo\*" /S /D
  attrib -R "$GitDir\*" /S /D

  Get-ChildItem "$GitDir" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue |
    Remove-Item -Force -ErrorAction SilentlyContinue
  Remove-Item (Join-Path $GitDir "FETCH_HEAD") -Force -ErrorAction SilentlyContinue
  Remove-Item (Join-Path $GitDir "index.lock") -Force -ErrorAction SilentlyContinue

  Set-Location -LiteralPath $CleanRepo
  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") { Block "still_running_from_system32" }
  if (!(Test-Path -LiteralPath ".git")) { Block "not_inside_git_repo" }

  $status = git status --short 2>&1
  if ($LASTEXITCODE -ne 0) { Block "git_status_failed: $status" }

  $fetchHead = Join-Path $GitDir "FETCH_HEAD"
  try {
    New-Item -Path $fetchHead -ItemType File -Force | Out-Null
    Remove-Item -Path $fetchHead -Force -ErrorAction Stop
  } catch {
    Block "git_fetch_head_still_blocked: $($_.Exception.Message)"
  }

  Write-Output "PREFLIGHT_PASS"
  Write-Output $status
} catch {
  if ($_.Exception.Message -notmatch "PREFLIGHT_BLOCKED") {
    Write-Error "PREFLIGHT_BLOCKED: $($_.Exception.Message)"
    exit 1
  }
  throw
}
