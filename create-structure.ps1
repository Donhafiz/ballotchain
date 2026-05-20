# Save this as create-structure.ps1 and run from your project root
# Or run line by line in PowerShell

$baseDir = "C:\Users\user\Desktop\voting-management-system"
cd $baseDir

# Create all directories using a simple loop
$paths = @(
    "public\fonts",
    "src\app\(auth)\login",
    "src\app\(auth)\register",
    "src\app\(auth)\forgot-password",
    "src\app\(auth)\verify-email",
    "src\app\(auth)\reset-password\[token]",
    "src\app\(dashboard)\admin\elections\create",
    "src\app\(dashboard)\admin\elections\[electionId]\candidates\add",
    "src\app\(dashboard)\admin\elections\[electionId]\candidates\[candidateId]",
    "src\app\(dashboard)\admin\elections\[electionId]\voters\import",
    "src\app\(dashboard)\admin\elections\[electionId]\voters\[voterId]",
    "src\app\(dashboard)\admin\elections\[electionId]\results\analytics",
    "src\app\(dashboard)\admin\elections\[electionId]\results\export",
    "src\app\(dashboard)\admin\elections\[electionId]\settings\access",
    "src\app\(dashboard)\admin\organizations\create",
    "src\app\(dashboard)\admin\organizations\[orgId]",
    "src\app\(dashboard)\admin\users\[userId]",
    "src\app\(dashboard)\admin\reports\audit-log",
    "src\app\(dashboard)\admin\reports\activity",
    "src\app\(dashboard)\admin\settings\system",
    "src\app\(dashboard)\admin\settings\security",
    "src\app\(dashboard)\organization\my-elections\create",
    "src\app\(dashboard)\organization\my-elections\[electionId]",
    "src\app\(dashboard)\organization\members\invite",
    "src\app\(dashboard)\organization\settings\profile",
    "src\app\(dashboard)\voter\elections\[electionId]\vote",
    "src\app\(dashboard)\voter\my-votes\[voteId]",
    "src\app\(dashboard)\voter\profile\settings",
    "src\app\(dashboard)\public-elections\[electionId]\results",
    "src\components\auth",
    "src\components\layouts",
    "src\components\elections",
    "src\components\voting",
    "src\components\admin",
    "src\components\results",
    "src\components\common",
    "src\components\charts",
    "src\components\organization",
    "src\components\shared",
    "src\lib\api",
    "src\lib\auth",
    "src\lib\db\queries",
    "src\lib\validation",
    "src\lib\utils",
    "src\lib\hooks",
    "src\lib\contexts",
    "src\lib\constants",
    "src\lib\types",
    "src\lib\middleware",
    "src\lib\services",
    "src\lib\logger",
    "src\styles\themes",
    "src\styles\animations",
    "src\styles\utilities",
    "src\__tests__\unit\services",
    "src\__tests__\unit\utils",
    "src\__tests__\unit\hooks",
    "src\__tests__\unit\lib",
    "src\__tests__\integration\api",
    "src\__tests__\integration\auth",
    "src\__tests__\integration\elections",
    "src\__tests__\e2e",
    "backend\src\services",
    "backend\src\models",
    "backend\src\controllers",
    "backend\src\routes",
    "backend\src\middleware",
    "backend\src\database",
    "backend\src\utils",
    "docs\guides",
    "config\database\migrations",
    "scripts",
    ".github\workflows",
    ".github\ISSUE_TEMPLATE",
    "e2e\fixtures",
    "e2e\pages",
    "e2e\tests"
)

foreach ($path in $paths) {
    New-Item -ItemType Directory -Path $path -Force -ErrorAction SilentlyContinue
    Write-Host "Created: $path" -ForegroundColor Green
}

Write-Host "`n✅ Directory structure created successfully!" -ForegroundColor Cyan
Write-Host "Total directories: $($paths.Count)" -ForegroundColor Yellow