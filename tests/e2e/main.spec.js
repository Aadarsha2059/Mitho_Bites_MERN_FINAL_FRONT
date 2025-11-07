import { test, expect } from '@playwright/test';

test.describe('Mitho Bites E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app homepage
    await page.goto('http://localhost:5173/');
  });

  test('1. User can navigate to login page', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your username')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
  });

  test('2. User can navigate to registration page', async ({ page }) => {
    await page.goto('http://localhost:5173/register');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByText('Full Name')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
  });

  test('3. User can access homepage', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('4. User can access about page', async ({ page }) => {
    await page.goto('http://localhost:5173/about');
    await expect(page.locator('body')).toBeVisible();
  });

  test('5. User can access contact page', async ({ page }) => {
    await page.goto('http://localhost:5173/contact');
    await expect(page.locator('body')).toBeVisible();
  });

  test('6. User can access menu page', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    await expect(page.locator('body')).toBeVisible();
  });

  test('7. User can access forgot password page', async ({ page }) => {
    await page.goto('http://localhost:5173/forgot-password');
    await expect(page.locator('body')).toBeVisible();
  });

  test('8. User can access homepage route', async ({ page }) => {
    await page.goto('http://localhost:5173/homepage');
    await expect(page.locator('body')).toBeVisible();
  });

  test('9. User can access settings page', async ({ page }) => {
    await page.goto('http://localhost:5173/settings');
    await expect(page.locator('body')).toBeVisible();
  });

  test('10. User can access cart page', async ({ page }) => {
    await page.goto('http://localhost:5173/cart');
    await expect(page.locator('body')).toBeVisible();
  });

  test('11. User can access payment method page', async ({ page }) => {
    await page.goto('http://localhost:5173/paymentmethod');
    await expect(page.locator('body')).toBeVisible();
  });

  test('12. User can access profile page', async ({ page }) => {
    await page.goto('http://localhost:5173/more/profile');
    await expect(page.locator('body')).toBeVisible();
  });
}); 


// 