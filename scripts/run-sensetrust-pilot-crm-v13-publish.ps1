$ErrorActionPreference = "Stop"

$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
$TargetRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"
$BaseBranch = "chore/sensetrust-pilot-onboarding-v12"
$BranchName = "chore/sensetrust-pilot-crm-v13"
$CommitMessage = "chore: add SenseTrust Pilot CRM v1.3"

if (!(Test-Path $SourceRepo)) {
  throw "Source repo not found: $SourceRepo"
}

if (!(Test-Path $TargetRepo)) {
  throw "Target clean clone not found: $TargetRepo"
}

function Copy-RepoFile {
  param([string]$RelativePath)

  $SourcePath = Join-Path $SourceRepo $RelativePath
  $TargetPath = Join-Path $TargetRepo $RelativePath
  $TargetDirectory = Split-Path $TargetPath -Parent

  if (!(Test-Path $SourcePath)) {
    throw "Missing source file: $RelativePath"
  }

  if (!(Test-Path $TargetDirectory)) {
    New-Item -ItemType Directory -Path $TargetDirectory | Out-Null
  }

  Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force
}

$Files = @(
  "src\types\sensetrust\pilot-crm.ts",
  "src\fixtures\sensetrust\simulated-pilot-crm.ts",
  "src\services\sensetrust\pilot-crm-service.ts",
  "src\components\sensetrust\PilotCRMDashboard.tsx",
  "src\components\sensetrust\PilotPipelineBoard.tsx",
  "src\components\sensetrust\PilotOrganizationCard.tsx",
  "src\components\sensetrust\PilotReadinessPanel.tsx",
  "src\components\sensetrust\PilotRiskPanel.tsx",
  "src\components\sensetrust\PilotCRMActivityTimeline.tsx",
  "src\pages\SenseTrustPilotCRM.tsx",
  "docs\sensetrust-pilot-crm-v13.md",
  "docs\sensetrust-pilot-crm-governance-v13.md",
  "docs\sensetrust-pilot-crm-playbook-v13.md",
  "docs\sensetrust-pilot-pipeline-matrix-v13.md",
  "docs\sensetrust-pilot-meeting-note-template-v13.md",
  "docs\sensetrust-pilot-crm-executive-dashboard-v13.md",
  "scripts\test-sensetrust-pilot-crm-v13.mjs",
  "scripts\apply-obsidian-pilot-crm-v13.ps1",
  "scripts\run-sensetrust-pilot-crm-v13-publish.ps1"
)

Set-Location $TargetRepo
git fetch origin
git switch $BaseBranch
git pull origin $BaseBranch

$ExistingBranch = git branch --list $BranchName
if ($ExistingBranch) {
  git switch $BranchName
} else {
  git switch -c $BranchName
}

foreach ($File in $Files) {
  Copy-RepoFile $File
}

git status --short
git add -- $Files
git commit -m $CommitMessage
git push -u origin $BranchName
git status --short
