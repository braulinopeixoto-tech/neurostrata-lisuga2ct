$ErrorActionPreference = "Stop"

$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
$TargetRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"
$BaseBranch = "chore/sensetrust-revenue-operations-v16"
$BranchName = "chore/sensetrust-investor-partnership-room-v17"
$CommitMessage = "docs: add SenseTrust investor and partnership room"

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
  "src\types\sensetrust\investor-room.ts",
  "src\services\sensetrust\investor-room-service.ts",
  "src\fixtures\sensetrust\simulated-investor-room.ts",
  "src\components\sensetrust\InvestorRoomDashboard.tsx",
  "src\components\sensetrust\DataRoomChecklistPanel.tsx",
  "src\components\sensetrust\PitchDeckOutlinePanel.tsx",
  "src\components\sensetrust\StrategicPartnerMapPanel.tsx",
  "src\components\sensetrust\DueDiligenceChecklistPanel.tsx",
  "src\components\sensetrust\InvestorFAQPanel.tsx",
  "src\components\sensetrust\UseOfFundsPanel.tsx",
  "src\components\sensetrust\InvestorRiskDisclosurePanel.tsx",
  "src\pages\SenseTrustInvestorRoom.tsx",
  "docs\sensetrust-investor-room-v17.md",
  "docs\sensetrust-data-room-index-v17.md",
  "docs\sensetrust-pitch-deck-textual-v17.md",
  "docs\sensetrust-investor-one-page-v17.md",
  "docs\sensetrust-strategic-partnership-map-v17.md",
  "docs\sensetrust-due-diligence-checklist-v17.md",
  "docs\sensetrust-investor-faq-v17.md",
  "docs\sensetrust-use-of-funds-v17.md",
  "docs\sensetrust-risk-disclosure-v17.md",
  "docs\sensetrust-institutional-alliance-narrative-v17.md",
  "docs\sensetrust-investor-executive-summary-v17.md",
  "scripts\test-sensetrust-investor-room-v17.mjs",
  "scripts\apply-obsidian-investor-room-v17.ps1",
  "scripts\run-sensetrust-investor-room-v17-publish.ps1"
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
