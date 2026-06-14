$ErrorActionPreference = "Stop"

$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
$TargetRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"
$BaseBranch = "chore/sensetrust-pricing-strategy-v15"
$BranchName = "chore/sensetrust-revenue-operations-v16"
$CommitMessage = "feat: add SenseTrust revenue operations readiness"

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
  "src\types\sensetrust\revenue-operations.ts",
  "src\services\sensetrust\revenue-operations-service.ts",
  "src\fixtures\sensetrust\simulated-revenue-operations.ts",
  "src\components\sensetrust\RevenueOperationsDashboard.tsx",
  "src\components\sensetrust\BillingReadinessChecklistPanel.tsx",
  "src\components\sensetrust\CommercialContractTemplatePanel.tsx",
  "src\components\sensetrust\SimulatedRevenueLedgerPanel.tsx",
  "src\components\sensetrust\UpgradeDowngradePolicyPanel.tsx",
  "src\components\sensetrust\RevenueRiskGovernancePanel.tsx",
  "src\components\sensetrust\PaymentGatewayReadinessPanel.tsx",
  "src\components\sensetrust\RevenueOpsExecutiveSummary.tsx",
  "src\pages\SenseTrustRevenueOperations.tsx",
  "docs\sensetrust-revenue-operations-v16.md",
  "docs\sensetrust-billing-readiness-v16.md",
  "docs\sensetrust-commercial-contract-template-v16.md",
  "docs\sensetrust-simulated-revenue-ledger-v16.md",
  "docs\sensetrust-revenue-governance-policy-v16.md",
  "docs\sensetrust-upgrade-downgrade-cancellation-policy-v16.md",
  "docs\sensetrust-payment-gateway-readiness-v16.md",
  "docs\sensetrust-fiscal-legal-review-queue-v16.md",
  "docs\sensetrust-revenue-risk-matrix-v16.md",
  "docs\sensetrust-revenue-ops-playbook-v16.md",
  "docs\sensetrust-revenue-ops-executive-report-v16.md",
  "scripts\test-sensetrust-revenue-operations-v16.mjs",
  "scripts\apply-obsidian-revenue-operations-v16.ps1",
  "scripts\run-sensetrust-revenue-operations-v16-publish.ps1"
)

Set-Location $TargetRepo
git switch $BaseBranch
git pull --ff-only

$ExistingBranch = git branch --list $BranchName
if ($ExistingBranch) { git switch $BranchName } else { git switch -c $BranchName }

foreach ($File in $Files) { Copy-RepoFile $File }

git status --short
git add -- $Files
git commit -m $CommitMessage
git push -u origin $BranchName
git status --short
