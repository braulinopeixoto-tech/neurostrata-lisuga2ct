$ErrorActionPreference = "Stop"

$SourceRepo = "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"
$TargetRepo = "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"
$BaseBranch = "chore/sensetrust-investor-partnership-room-v17"
$BranchName = "chore/sensetrust-public-narrative-v18"
$CommitMessage = "docs: add SenseTrust public narrative and institutional authority"

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
  "src\types\sensetrust\public-narrative.ts",
  "src\services\sensetrust\public-narrative-service.ts",
  "src\fixtures\sensetrust\simulated-public-narrative.ts",
  "src\components\sensetrust\PublicNarrativeDashboard.tsx",
  "src\components\sensetrust\ManifestoPanel.tsx",
  "src\components\sensetrust\WebsiteCopyPanel.tsx",
  "src\components\sensetrust\ClaimsGovernancePanel.tsx",
  "src\components\sensetrust\AudienceMessagingMatrix.tsx",
  "src\components\sensetrust\PublicFAQPanel.tsx",
  "src\components\sensetrust\InstitutionalAuthorityPillars.tsx",
  "src\components\sensetrust\PublicRiskDisclosurePanel.tsx",
  "src\pages\SenseTrustPublicNarrative.tsx",
  "docs\sensetrust-public-narrative-v18.md",
  "docs\sensetrust-manifesto-v18.md",
  "docs\sensetrust-website-copy-v18.md",
  "docs\sensetrust-public-thesis-v18.md",
  "docs\sensetrust-public-claims-governance-v18.md",
  "docs\sensetrust-audience-messaging-v18.md",
  "docs\sensetrust-public-faq-v18.md",
  "docs\sensetrust-press-kit-v18.md",
  "docs\sensetrust-institutional-authority-v18.md",
  "docs\sensetrust-public-risk-disclosure-v18.md",
  "docs\sensetrust-public-communication-review-queue-v18.md",
  "scripts\test-sensetrust-public-narrative-v18.mjs",
  "scripts\apply-obsidian-public-narrative-v18.ps1",
  "scripts\run-sensetrust-public-narrative-v18-publish.ps1"
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
