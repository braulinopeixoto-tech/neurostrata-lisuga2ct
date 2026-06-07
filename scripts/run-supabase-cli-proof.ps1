param(
  [Parameter(Mandatory = $true)]
  [string]$SupabaseAccessToken,

  [string]$ProjectRef = "yponblaeampkodzjrjko"
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

$env:SUPABASE_ACCESS_TOKEN = $SupabaseAccessToken
$env:npm_config_cache = Join-Path $RepoRoot ".npm-cache"
New-Item -ItemType Directory -Force $env:npm_config_cache | Out-Null
New-Item -ItemType Directory -Force "docs\execution-logs" | Out-Null

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$Log = "docs\execution-logs\sensetrust-supabase-cli-$Stamp.log"
$Npx = "C:\Program Files\nodejs\npx.cmd"

"timestamp=$Stamp" | Tee-Object -FilePath $Log
"project_ref=$ProjectRef" | Tee-Object -FilePath $Log -Append
"cwd=$RepoRoot" | Tee-Object -FilePath $Log -Append

if (-not (Test-Path $Npx)) {
  throw "npx not found at $Npx"
}

"node=$(& 'C:\Program Files\nodejs\node.exe' -v)" | Tee-Object -FilePath $Log -Append
"npm=$(& 'C:\Program Files\nodejs\npm.cmd' -v)" | Tee-Object -FilePath $Log -Append
"npx=$(& $Npx -v)" | Tee-Object -FilePath $Log -Append

"COMMAND: npx.cmd supabase --version" | Tee-Object -FilePath $Log -Append
& $Npx supabase --version 2>&1 | Tee-Object -FilePath $Log -Append

"COMMAND: npx.cmd supabase link --project-ref $ProjectRef" | Tee-Object -FilePath $Log -Append
& $Npx supabase link --project-ref $ProjectRef 2>&1 | Tee-Object -FilePath $Log -Append

"COMMAND: npx.cmd supabase migration list" | Tee-Object -FilePath $Log -Append
& $Npx supabase migration list 2>&1 | Tee-Object -FilePath $Log -Append

"COMMAND: npx.cmd supabase db push" | Tee-Object -FilePath $Log -Append
& $Npx supabase db push 2>&1 | Tee-Object -FilePath $Log -Append

"COMMAND: npx.cmd supabase migration list" | Tee-Object -FilePath $Log -Append
& $Npx supabase migration list 2>&1 | Tee-Object -FilePath $Log -Append

"NEXT: run docs\supabase-validation-queries.sql in Supabase SQL Editor or via SQL-capable authenticated client." | Tee-Object -FilePath $Log -Append
"log=$Log"
