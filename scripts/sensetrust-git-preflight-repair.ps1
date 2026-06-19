param(
  [string]$CleanRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct",
  [string]$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
)

$ErrorActionPreference = "Stop"
$Principal = "$env:USERDOMAIN\$env:USERNAME"
$GitDir = Join-Path $CleanRepo ".git"

function Block($Reason) {
  Write-Error $Reason
  exit 1
}

function Stop-GitLockingProcesses {
  Get-Process Obsidian,node,git,git-remote-https,git-credential-manager -ErrorAction SilentlyContinue |
    Stop-Process -Force -ErrorAction SilentlyContinue
}

function Invoke-BestEffort($ScriptBlock) {
  try { & $ScriptBlock | Out-Null } catch { Write-Output "PREFLIGHT_NOTICE: $($_.Exception.Message)" }
}

function Repair-FetchHeadAcl {
  param(
    [Parameter(Mandatory = $true)]
    [string]$CleanRepo,
    [Parameter(Mandatory = $true)]
    [string]$Principal
  )

  $GitDir = Join-Path $CleanRepo ".git"
  $FetchHead = Join-Path $CleanRepo ".git\FETCH_HEAD"
  $Timestamp = Get-Date -Format "yyyyMMddHHmmss"
  $Backup = Join-Path $GitDir "FETCH_HEAD.blocked.$Timestamp.bak"

  Write-Output "PREFLIGHT_CLEAN_REPO=$CleanRepo"
  Write-Output "PREFLIGHT_PRINCIPAL=$Principal"
  Write-Output "PREFLIGHT_RUNNING_FROM_SYSTEM32=$((Get-Location).Path -ieq 'C:\WINDOWS\system32')"

  Stop-GitLockingProcesses

  if (!(Test-Path -LiteralPath $CleanRepo)) { Block "PREFLIGHT_BLOCKED_CLEAN_REPO_MISSING: $CleanRepo" }
  if (!(Test-Path -LiteralPath $GitDir)) { Block "PREFLIGHT_BLOCKED_GIT_DIR_MISSING: $GitDir" }

  if (Test-Path -LiteralPath $FetchHead) {
    Write-Output "PREFLIGHT_FETCH_HEAD_FOUND=$FetchHead"
    Invoke-BestEffort { takeown /F "$FetchHead" /A }
    Invoke-BestEffort { icacls "$FetchHead" /inheritance:e }
    Invoke-BestEffort { icacls "$FetchHead" /grant "${Principal}:F" }
    Invoke-BestEffort { icacls "$FetchHead" /grant "Administrators:F" }
    Invoke-BestEffort { icacls "$FetchHead" /grant "SYSTEM:F" }
    Invoke-BestEffort { attrib -R -H -S "$FetchHead" }

    try {
      Remove-Item -LiteralPath $FetchHead -Force -ErrorAction Stop
      Write-Output "PREFLIGHT_FETCH_HEAD_REMOVED=true"
    } catch {
      Write-Output "PREFLIGHT_FETCH_HEAD_REMOVE_FAILED=$($_.Exception.Message)"
      try {
        Rename-Item -LiteralPath $FetchHead -NewName (Split-Path $Backup -Leaf) -Force -ErrorAction Stop
        Write-Output "PREFLIGHT_FETCH_HEAD_RENAMED=$Backup"
      } catch {
        Write-Output "PREFLIGHT_FETCH_HEAD_RENAME_FAILED=$($_.Exception.Message)"
        Write-Output "PREFLIGHT_FETCH_HEAD_EXISTS_AFTER_REPAIR=$(Test-Path -LiteralPath $FetchHead)"
        Block "PREFLIGHT_BLOCKED_FETCH_HEAD_ACL: $FetchHead"
      }
    }
  } else {
    Write-Output "PREFLIGHT_FETCH_HEAD_FOUND=false"
  }

  if (Test-Path -LiteralPath $FetchHead) {
    Write-Output "PREFLIGHT_FETCH_HEAD_EXISTS_AFTER_REPAIR=true"
    Block "PREFLIGHT_BLOCKED_FETCH_HEAD_ACL: $FetchHead"
  }

  Write-Output "PREFLIGHT_FETCH_HEAD_EXISTS_AFTER_REPAIR=false"
  Write-Output "PREFLIGHT_FETCH_HEAD_CLEARED"
}

try {
  Write-Output "PREFLIGHT_CLEAN_REPO=$CleanRepo"
  Write-Output "PREFLIGHT_PRINCIPAL=$Principal"
  Write-Output "PREFLIGHT_RUNNING_FROM_SYSTEM32=$((Get-Location).Path -ieq 'C:\WINDOWS\system32')"

  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") { Block "PREFLIGHT_BLOCKED_RUNNING_FROM_SYSTEM32" }
  if (!(Test-Path -LiteralPath $CleanRepo)) { Block "PREFLIGHT_BLOCKED_CLEAN_REPO_MISSING: $CleanRepo" }
  if (!(Test-Path -LiteralPath $SourceRepo)) { Block "PREFLIGHT_BLOCKED_SOURCE_REPO_MISSING: $SourceRepo" }
  if (!(Test-Path -LiteralPath $GitDir)) { Block "PREFLIGHT_BLOCKED_GIT_DIR_MISSING: $GitDir" }

  Stop-GitLockingProcesses

  Invoke-BestEffort { takeown /F "$CleanRepo" /R /D Y }
  Invoke-BestEffort { takeown /F "$GitDir" /R /D Y }

  Invoke-BestEffort { icacls "$CleanRepo" /grant "${Principal}:(OI)(CI)F" /T }
  Invoke-BestEffort { icacls "$GitDir" /grant "${Principal}:(OI)(CI)F" /T }
  Invoke-BestEffort { icacls (Join-Path $GitDir "refs") /grant "${Principal}:(OI)(CI)F" /T }

  Invoke-BestEffort { attrib -R "$CleanRepo\*" /S /D }
  Invoke-BestEffort { attrib -R "$GitDir\*" /S /D }

  Get-ChildItem "$GitDir" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue |
    Remove-Item -Force -ErrorAction SilentlyContinue
  Remove-Item (Join-Path $GitDir "index.lock") -Force -ErrorAction SilentlyContinue

  Repair-FetchHeadAcl -CleanRepo $CleanRepo -Principal $Principal

  Set-Location -LiteralPath $CleanRepo
  if ((Get-Location).Path -ieq "C:\WINDOWS\system32") { Block "PREFLIGHT_BLOCKED_RUNNING_FROM_SYSTEM32_AFTER_REPAIR" }
  if (!(Test-Path -LiteralPath ".git")) { Block "PREFLIGHT_BLOCKED_GIT_DIR_MISSING: $GitDir" }

  $status = git status --short 2>&1
  if ($LASTEXITCODE -ne 0) { Block "PREFLIGHT_BLOCKED_GIT_STATUS_FAILED: $status" }

  Write-Output "PREFLIGHT_PASS"
  Write-Output $status
} catch {
  if ($_.Exception.Message -notmatch "PREFLIGHT_BLOCKED") {
    Write-Error "PREFLIGHT_BLOCKED_GIT_STATUS_FAILED: $($_.Exception.Message)"
    exit 1
  }
  throw
}
