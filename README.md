# Oblast Management System - E2E Testing

This repository contains comprehensive end-to-end (E2E) tests for the Oblast Management System using Playwright.

## System Under Test

**Website:** https://oblastms.k8s.pixel8.ph/#/login  
**Test Credentials:**

- Username: `collector`
- Password: `123`

## Test Coverage

### 1. Login Module (`tests/oblast-login.spec.ts`)

- ✅ Login with valid credentials
- ✅ Handle invalid credentials
- ✅ Handle empty credentials

### 2. Transaction Module (`tests/transaction-module.spec.ts`)

- **Transaction Billing**
  - ✅ Create new transaction billing
  - ✅ View list of fees to be paid
  - ✅ Update billing information
- **Citizen Information Management**
  - ✅ Input and view citizen personal information
  - ✅ Update citizen information
- **Billing ID and QR Code Generation**
  - ✅ Send billing ID and QR code to citizen email
- **Payment Processing**
  - ✅ View and verify transaction details for payment
  - ✅ Post transaction for payment
- **Transaction Status and Activity**
  - ✅ View transaction status details (For Payment, Paid, Cancelled)
  - ✅ View transaction activity logs
- **Billing Statement and Receipt Management**
  - ✅ Print billing statement
  - ✅ Download billing statement
- **Transaction Cancellation and Payment Status**
  - ✅ Cancel transaction
  - ✅ Mark transaction as paid

### 3. Activity Module (`tests/activity-module.spec.ts`)

- **Activity Log Functionality**
  - ✅ Display system activity records
  - ✅ Show citizen name in activity records
  - ✅ Display billing ID in activity records
  - ✅ Show date of payment in activity records
  - ✅ Display transaction status in activity records
  - ✅ Provide transparency and accountability through activity tracking
  - ✅ Enable easy tracking of transaction changes
  - ✅ Support activity log navigation and pagination

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn**
3. **Playwright browsers** (automatically installed)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npm run install-browsers
```

## Running Tests

### All Tests

```bash
# Run all tests (headless mode)
npm test

# Run all tests with browser visible
npm run test:headed

# Run tests with interactive UI
npm run test:ui
```

### Individual Test Suites

```bash
# Login tests only
npm run test:login

# Transaction module tests only
npm run test:transaction

# Activity module tests only
npm run test:activity
```

### Browser-Specific Tests

```bash
# Run tests in Chrome only
npm run test:chrome

# Run tests in Firefox only
npm run test:firefox
```

### Debugging Tests

```bash
# Debug mode (step through tests)
npm run test:debug

# Run specific test with debug
npx playwright test tests/oblast-login.spec.ts --debug
```

## Test Reports

After running tests, you can view reports:

```bash
# Open HTML report
npm run report

# View JSON results
cat test-results/results.json
```

## Test Configuration

The tests are configured in `playwright.config.ts` with:

- **Base URL:** https://oblastms.k8s.pixel8.ph
- **Browsers:** Chrome and Firefox
- **Screenshots:** Captured on failure
- **Videos:** Recorded on failure
- **Traces:** Captured on retry

## Test Structure

Each test file follows this pattern:

```typescript
import { test, expect } from "@playwright/test";

// Helper function to login
async function loginToSystem(page) {
  await page.goto("/#/login");
  await page.fill('input[name="username"]', "collector");
  await page.fill('input[name="password"]', "123");
  await page.click('button[type="submit"]');
  await expect(page).not.toHaveURL(/login/);
}

test.describe("Module Name", () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  test("should test specific functionality", async ({ page }) => {
    // Test implementation
  });
});
```

## Best Practices Implemented

1. **Robust Selectors:** Uses multiple fallback selectors for elements
2. **Wait Strategies:** Proper waiting for network idle and element visibility
3. **Error Handling:** Graceful handling of missing elements
4. **Reusable Functions:** Login helper function used across tests
5. **Comprehensive Coverage:** Tests all major user workflows
6. **Parallel Execution:** Tests run in parallel for faster execution

## Test Data

The tests use the following test data:

- **Test User:** collector / 123
- **Sample Citizen:** John Doe, John Smith
- **Sample Email:** john.smith@email.com
- **Sample Phone:** 09123456789
- **Sample Amount:** 1000, 1500

## Troubleshooting

### Common Issues

1. **Login Failure:**

   - Verify the website is accessible
   - Check if credentials are still valid
   - Ensure the login selectors match the actual form

2. **Element Not Found:**

   - The application UI might have changed
   - Update selectors in the test files
   - Use Playwright's codegen tool to record new selectors

3. **Timeout Errors:**
   - Increase timeout in `playwright.config.ts`
   - Check network connectivity
   - Verify the application is responsive

### Recording New Tests

Use Playwright's codegen to record new test actions:

```bash
npx playwright codegen https://oblastms.k8s.pixel8.ph/#/login
```

### Updating Selectors

If the UI changes, update selectors using Playwright Inspector:

```bash
npx playwright test --debug
```

## Continuous Integration

For CI/CD pipelines, use:

```bash
# Install dependencies and browsers
npm ci
npm run install-browsers

# Run tests in CI mode
npm test
```

## Documentation References

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)

## Contributing

When adding new tests:

1. Follow the existing test structure
2. Use the login helper function
3. Add proper wait strategies
4. Include comprehensive assertions
5. Update this README with new test coverage
