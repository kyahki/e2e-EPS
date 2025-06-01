import { test, expect } from '@playwright/test';

test.describe('Oblast Management System - Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://oblastms.k8s.pixel8.ph/#/login');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Fill in the login credentials
    await page.fill('input[name="username"], input[type="text"], #username, [placeholder*="username" i], [placeholder*="user" i]', 'collector');
    await page.fill('input[name="password"], input[type="password"], #password, [placeholder*="password" i]', '123');

    // Click the login button
    await page.click('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    // Wait for navigation after login
    await page.waitForLoadState('networkidle');

    // Verify successful login by checking if we're redirected to dashboard/main page
    await expect(page).not.toHaveURL(/login/);
    
    // Check if we can see some dashboard elements or main navigation
    await expect(page.locator('body')).not.toContainText('Login');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('https://oblastms.k8s.pixel8.ph/#/login');
    await page.waitForLoadState('networkidle');

    // Try with invalid credentials
    await page.fill('input[name="username"], input[type="text"], #username, [placeholder*="username" i], [placeholder*="user" i]', 'invaliduser');
    await page.fill('input[name="password"], input[type="password"], #password, [placeholder*="password" i]', 'wrongpassword');

    await page.click('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    // Wait a moment for error message to appear
    await page.waitForTimeout(2000);

    // Check for error message or that we're still on login page
    const url = page.url();
    expect(url).toContain('login');
  });

  test('should handle empty credentials', async ({ page }) => {
    await page.goto('https://oblastms.k8s.pixel8.ph/#/login');
    await page.waitForLoadState('networkidle');

    // Try to login with empty credentials
    await page.click('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    await page.waitForTimeout(1000);

    // Should still be on login page
    expect(page.url()).toContain('login');
  });
}); 