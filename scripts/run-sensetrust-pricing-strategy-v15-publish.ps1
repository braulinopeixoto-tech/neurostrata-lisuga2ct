$ErrorActionPreference = "Stop"

$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
$TargetRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"
$BaseBranch = "chore/sensetrust-feedback-intelligence-v14"
$BranchName = "chore/sensetrust-pricing-strategy-v15"
$CommitMessage = "feat: add SenseTrust pricing strategy"

if (!(Test-Path $SourceRepo)) { throw "Source repo not found: $SourceRepo" }
if (!(Test-Path $TargetRepo)) { throw "Target clean clone not found: $TargetRepo" }

function Copy-RepoFile {
  param([string]$RelativePath)
  $SourcePath = Join-Path $SourceRepo $RelativePath
  $TargetPath = Join-Path $TargetRepo $RelativePath
  $TargetDirectory = Split-Path $TargetPath -Parent
  if (!(Test-Path $SourcePath)) { throw "Missing source file: $RelativePath" }
  if (!(Test-Path $TargetDirectory)) { New-Item -ItemType Directory -Path $TargetDirectory | Out-Null }
  Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force
}

$Files = @(
  "src\types\sensetrust\pricing-strategy.ts",
  "src\services\sensetrust\pricing-strategy-service.ts",
  "src\fixtures\sensetrust\simulated-pricing-strategy.ts",
  "src\components\sensetrust\PricingStrategyDashboard.tsx",
  "src\components\sensetrust\PricingPlanCard.tsx",
  "src\components\sensetrust\PaidPilotOfferPanel.tsx",
  "src\components\sensetrust\RevenueValidationScenarioPanel.tsx",
  "src\components\sensetrust\PricingObjectionMatrix.tsx",
  "src\components\sensetrust\CommercialSegmentRanking.tsx",
  "src\components\sensetrust\RevenueReadinessScoreCard.tsx",
  "src\pages\SenseTrustPricingStrategy.tsx",
  "docs\sensetrust-pricing-strategy-v15.md",
  "docs\sensetrust-pricing-plan-matrix-v15.md",
  "docs\sensetrust-paid-pilot-offer-v15.md",
  "docs\sensetrust-revenue-validation-model-v15.md",
  "docs\sensetrust-pricing-objections-v15.md",
  "docs\sensetrust-commercial-policy-v15.md",
  "docs\sensetrust-consultative-sales-playbook-v15.md",
  "docs\sensetrust-pricing-executive-report-v15.md",
  "docs\sensetrust-commercial-decision-matrix-v15.md",
  "scripts\test-sensetrust-pricing-strategy-v15.mjs",
  "scripts\apply-obsidian-pricing-strategy-v15.ps1",
  "scripts\run-sensetrust-pricing-strategy-v15-publish.ps1"
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
