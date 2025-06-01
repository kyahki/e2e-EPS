# Oblast Management System E2E Test Runner
# Quick start script for running your first E2E test

Write-Host "================================================" -ForegroundColor Green
Write-Host "Oblast Management System - E2E Testing Setup" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "1. Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "2. Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "   ✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install Playwright browsers
Write-Host "3. Installing Playwright browsers..." -ForegroundColor Yellow
npm run install-browsers
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Playwright browsers installed successfully" -ForegroundColor Green
} else {
    Write-Host "   ✗ Failed to install Playwright browsers" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Setup Complete! Ready to run E2E tests" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Show available commands
Write-Host "Available test commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Basic Commands:" -ForegroundColor Yellow
Write-Host "  npm test                    # Run all tests (headless)"
Write-Host "  npm run test:headed         # Run tests with browser visible"
Write-Host "  npm run test:ui             # Interactive UI mode"
Write-Host ""
Write-Host "Individual Test Suites:" -ForegroundColor Yellow
Write-Host "  npm run test:login          # Login functionality tests"
Write-Host "  npm run test:transaction    # Transaction module tests"
Write-Host "  npm run test:activity       # Activity module tests"
Write-Host ""
Write-Host "Debug and Reporting:" -ForegroundColor Yellow
Write-Host "  npm run test:debug          # Debug mode (step through)"
Write-Host "  npm run report              # View test report"
Write-Host ""

# Ask user what they want to run
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Run login tests (quick start)" -ForegroundColor White
Write-Host "2. Run all tests" -ForegroundColor White
Write-Host "3. Run tests with browser visible" -ForegroundColor White
Write-Host "4. Open interactive test UI" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Running login tests..." -ForegroundColor Green
        npm run test:login
    }
    "2" {
        Write-Host ""
        Write-Host "Running all tests..." -ForegroundColor Green
        npm test
    }
    "3" {
        Write-Host ""
        Write-Host "Running tests with browser visible..." -ForegroundColor Green
        npm run test:headed
    }
    "4" {
        Write-Host ""
        Write-Host "Opening interactive test UI..." -ForegroundColor Green
        npm run test:ui
    }
    "5" {
        Write-Host "Goodbye!" -ForegroundColor Green
        exit 0
    }
    default {
        Write-Host "Invalid choice. Running login tests as default..." -ForegroundColor Yellow
        npm run test:login
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Test execution completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  • View HTML report: npm run report" -ForegroundColor White
Write-Host "  • Debug failed tests: npm run test:debug" -ForegroundColor White
Write-Host "  • Check test-results/ folder for details" -ForegroundColor White
Write-Host "================================================" -ForegroundColor Green 