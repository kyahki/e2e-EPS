import { test, expect } from '@playwright/test';

test('Allows the creation, viewing, and updating of citizen data, ensuring that billing and transaction processes are supported by accurate and up-to-date citizen information.', async ({ page }) => {
  // Generate unique email using timestamp
  const uniqueEmail = `test${Date.now()}@email.com`;
  
  await page.goto('https://oblastms.k8s.pixel8.ph/#/login');
  await page.getByText('Register').click();
  await page.getByPlaceholder('Enter Last Name').click();
  await page.getByPlaceholder('Enter Last Name').fill('Vasquez');
  await page.getByPlaceholder('Enter First Name').click();
  await page.getByPlaceholder('Enter First Name').fill('Kyle');
  await page.getByPlaceholder('Enter Middle Name').click();
  await page.getByPlaceholder('Enter Middle Name').fill('Tarjo');
  await page.getByPlaceholder('Enter Email Address').click();
  await page.getByPlaceholder('Enter Email Address').fill(uniqueEmail);
  await page.getByRole('textbox', { name: '+' }).click();
  await page.getByRole('textbox', { name: '+' }).fill('991-1231-2312');
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Wait for calendar icon and click it
  await page.locator('i.material-icons').filter({ hasText: 'event' }).click();
  
  // Wait for calendar to be visible and navigate to desired month/year
  await page.waitForSelector('[role="menu"]');
  await page.getByRole('button').filter({ hasText: 'chevron_left' }).first().click();
  await page.getByRole('button').filter({ hasText: 'chevron_left' }).first().click();
  
  // Select first day of month using a simpler selector
  await page.getByRole('button', { name: '1' }).first().click();
  
  await page.getByPlaceholder('Enter Address').click();
  await page.locator('label').filter({ hasText: 'Select Regionarrow_drop_down' }).locator('i').click();
  await page.getByRole('option', { name: 'NCR' }).locator('div').nth(1).click();
  await page.locator('label').filter({ hasText: 'Select Province/' }).locator('i').click();
  await page.getByText('National Capital Region').click();
  await page.locator('label').filter({ hasText: 'Select Municipality/' }).locator('i').click();
  await page.getByText('City of Marikina').click();
  await page.locator('label').filter({ hasText: 'Select Barangay/' }).locator('i').click();
  await page.getByText('Jesus De La Peña').click();
  await page.getByPlaceholder('Enter Postal or ZIP code').click();
  await page.getByPlaceholder('Enter Postal or ZIP code').fill('6000');
  await page.getByPlaceholder('Enter your lot, block, phase').click();
  await page.getByPlaceholder('Enter your lot, block, phase').fill('Marikina Block');
  await page.getByPlaceholder('Enter your street name').click();
  await page.getByPlaceholder('Enter your street name').fill('Jesus De la Pena Street');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('label').filter({ hasText: 'Select Genderarrow_drop_down' }).locator('i').click();
  await page.getByRole('option', { name: 'Male', exact: true }).locator('div').nth(1).click();
  await page.locator('label:nth-child(12) > .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native').click();
  await page.getByRole('option', { name: 'None' }).locator('div').nth(2).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Enter your desired username').click();
  await page.getByPlaceholder('Enter your desired username').fill('test');
  await page.getByPlaceholder('Enter Password').click();
  await page.getByPlaceholder('Enter Password').fill('123');
  await page.getByPlaceholder('Confirm Password').click();
  await page.getByPlaceholder('Confirm Password').fill('123');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('checkbox', { name: 'I have read and agree to the Terms of Service' }).click();
  await page.getByRole('checkbox', { name: 'I have read and agree to the Data Privacy Policy' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('https://oblastms.k8s.pixel8.ph/#/login');
  await page.getByPlaceholder('Enter Username').click();
  await page.getByPlaceholder('Enter Username').fill('test');
  await page.getByPlaceholder('Enter Password').click();
  await page.getByPlaceholder('Enter Password').fill('123');
  
  // Handle login and navigation more robustly
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: 'Log in' }).click()
  ]);

  // Wait for successful login and dashboard
  await expect(page.locator('text=Success!')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('text=Online Business Permit and License Application System')).toBeVisible({ timeout: 60000 });
  
  // Navigate to profile and wait for page load
  await page.getByText('expand_more').click();
  await page.getByRole('banner').getByText('My Profile').click();
  
  // Wait for profile page URL and Edit Profile link
  await expect(page).toHaveURL(/\/account\/profile/);
  await expect(page.getByRole('link', { name: 'Edit Profile' })).toBeVisible({ timeout: 30000 });
  await page.getByText('Full Name').click();
  await page.getByRole('link', { name: 'Edit Profile' }).click();
  
  await page.getByPlaceholder('####-###-###').click();
  await page.getByPlaceholder('####-###-###').fill('9911-231-222');
  await page.getByLabel('', { exact: true }).nth(2).click();
  await page.getByLabel('', { exact: true }).nth(1).click();
  await page.getByLabel('', { exact: true }).first().click();
  await page.getByLabel('', { exact: true }).first().click();
  await page.getByLabel('', { exact: true }).nth(1).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByRole('button').filter({ hasText: 'arrow_back' }).click();
  await page.getByText('home').click();
  await page.getByText('home').click();
  await page.getByText('home').click();
  await page.getByText('settingsSettings').click();
  await page.getByText('home').click();
  await page.getByText('home').click();
  await page.getByText('home').click();
  await page.getByRole('banner').getByText('Logout').click();
  await page.getByPlaceholder('Enter Username').click();
  await page.getByPlaceholder('Enter Username').fill('test');
  await page.getByPlaceholder('Enter Password').click();
  await page.getByPlaceholder('Enter Password').fill('123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Online Business Permit and' }).click();
  await page.getByRole('listitem').filter({ hasText: 'date_range Online Application' }).click();
  await page.getByRole('link').first().click();
  await page.getByText('home').click();
});