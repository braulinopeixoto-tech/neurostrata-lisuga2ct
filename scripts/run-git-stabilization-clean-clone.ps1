param(
  [string]$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01",
  [string]$TargetRoot = "C:\NeuroStrata",
  [string]$RemoteUrl = "https://github.com/braulinopeixoto-tech/neurostrata-lisuga2ct.git",
  [string]$BranchName = "chore/sensetrust-foundation-proof"
)

$ErrorActionPreference = "Stop"

$TargetRepo = Join-Path $TargetRoot "neurostrata-lisuga2ct"

function Copy-Path($RelativePath) {
  $Source = Join-Path $SourceRepo $RelativePath
  $Target = Join-Path $TargetRepo $RelativePath
  if (-not (Test-Path -LiteralPath $Source)) {
    Write-Output "SKIP missing: $RelativePath"
    return
  }

  if ((Get-Item -LiteralPath $Source).PSIsContainer) {
    New-Item -ItemType Directory -Force $Target | Out-Null
    Copy-Item -LiteralPath (Join-Path $Source "*") -Destination $Target -Recurse -Force
  } else {
    New-Item -ItemType Directory -Force (Split-Path -Parent $Target) | Out-Null
    Copy-Item -LiteralPath $Source -Destination $Target -Force
  }
  Write-Output "COPIED: $RelativePath"
}

New-Item -ItemType Directory -Force $TargetRoot | Out-Null

if (-not (Test-Path -LiteralPath $TargetRepo)) {
  git clone $RemoteUrl $TargetRepo
} else {
  Write-Output "Target repo already exists: $TargetRepo"
}

Set-Location $TargetRepo
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c $BranchName

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
  Copy-Path $RelativePath
}

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

git status --short
git add -- $GitAddPaths
git commit -m "chore: add SenseTrust foundation and Obsidian memory sync"
git push -u origin $BranchName
git status --short

Write-Output "DONE: $TargetRepo on branch $BranchName"
