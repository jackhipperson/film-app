import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Search" }).click();
});

test("renders correctly", async ({ page }) => {
   await expect(page.getByRole('heading', { name: 'Film App' })).toBeVisible
   await expect(page.getByRole('link', { name: 'Search' })).toBeVisible
   await expect(page.getByRole('link', { name: 'Search' })).toHaveClass(/ bg-yellow-600/)
   await expect(page.getByRole('link', { name: 'Favourites' })).toBeVisible
   await expect(page.getByRole('link', { name: 'Favourites' })).toHaveClass(/hover:bg-yellow-600/)
   await expect(page.getByRole('link', { name: 'Recommended' })).toBeVisible
   await expect(page.getByRole('link', { name: 'Recommended' })).toHaveClass(/hover:bg-yellow-600/)
   await expect(page.getByRole('link', { name: 'Watch List' })).toBeVisible
   await expect(page.getByRole('link', { name: 'Watch List' })).toHaveClass(/hover:bg-yellow-600/)
   await expect(page.getByRole('link', { name: 'Help' })).toBeVisible
   await expect(page.getByRole('link', { name: 'Help' })).toHaveClass(/hover:bg-yellow-600/)
   await expect(page.getByPlaceholder('Enter a film search...')).toBeVisible
   await expect(page.getByText('Type 3 letters to start search')).toBeVisible
});

test("renders correctly", async ({ page }) => {
}
