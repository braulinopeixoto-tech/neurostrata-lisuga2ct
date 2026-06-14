$ErrorActionPreference = "Stop"

$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
$TargetRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"
$BaseBranch = "chore/sensetrust-pilot-crm-v13"
$BranchName = "chore/sensetrust-feedback-intelligence-v14"
$CommitMessage = "feat: add SenseTrust pilot feedback intelligence"

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
  "src\types\sensetrust\pilot-feedback-intelligence.ts",
  "src\services\sensetrust\pilot-feedback-intelligence-service.ts",
  "src\fixtures\sensetrust\simulated-pilot-feedback-intelligence.ts",
  "src\components\sensetrust\PilotFeedbackIntelligenceDashboard.tsx",
  "src\components\sensetrust\PilotAcceptanceMetricsPanel.tsx",
  "src\components\sensetrust\PilotValuePerceptionScoreCard.tsx",
  "src\components\sensetrust\PilotObjectionRiskMatrix.tsx",
  "src\components\sensetrust\PilotSegmentPriorityMatrix.tsx",
  "src\components\sensetrust\PilotGTMRecommendationPanel.tsx",
  "src\components\sensetrust\PilotFeedbackTimeline.tsx",
  "src\pages\SenseTrustPilotFeedbackIntelligence.tsx",
  "docs\sensetrust-pilot-feedback-intelligence-v14.md",
  "docs\sensetrust-feedback-scoring-model-v14.md",
  "docs\sensetrust-pilot-feedback-questionnaire-v14.md",
  "docs\sensetrust-pilot-objections-and-mitigations-v14.md",
  "docs\sensetrust-market-signals-v14.md",
  "docs\sensetrust-feedback-executive-report-v14.md",
  "docs\sensetrust-go-to-market-playbook-v14.md",
  "docs\sensetrust-segment-decision-matrix-v14.md",
  "scripts\test-sensetrust-feedback-intelligence-v14.mjs",
  "scripts\apply-obsidian-feedback-intelligence-v14.ps1",
  "scripts\run-sensetrust-feedback-intelligence-v14-publish.ps1"
)

Set-Location $TargetRepo
git switch $BaseBranch
git pull --ff-only

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
