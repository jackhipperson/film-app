import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Favourites" }).click();
});

test("renders correctly", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Film App" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Favourites" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Favourites" })).toHaveClass(
    / bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Recommended" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Recommended" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Watch List" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Watch List" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Help" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Help" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole('heading', { name: 'Favourites' })).toBeVisible();
  await expect(page.getByText("No Results!")).toBeVisible();
});

test("check that watchlist buttons works", async ({ page }) => {
  await page.getByRole("link", { name: "Search" }).click();
  await page.getByPlaceholder("Enter a film search...").fill("Bat");
  // click favourite
  await page
    .locator("li")
    .filter({ hasText: "Vikings: Battle of Heirs (" })
    .getByRole("img")
    .nth(1)
    .click();
  // open modal and click watchlist
  await page.getByRole("img", { name: "Battle Over Britain" }).click();
  await page.getByRole("img", { name: "Favourites" }).click();
  await page.getByRole("img", { name: "Close" }).click();
  // check favourites
  await page.getByRole("link", { name: "Favourites" }).click();
  await expect(page.getByText("Vikings: Battle of Heirs")).toBeVisible();
  await expect(page.getByText("Battle Over Britain")).toBeVisible();
  await expect(page.getByText("No Results!")).not.toBeVisible();
  // remove from favourites
  await page.getByRole('img', { name: 'Favourite' }).nth(1).click()
  await page.getByRole('img', { name: 'Favourite' }).first().click()
  await expect(page.getByText("Vikings: Battle of Heirs")).not.toBeVisible();
  await expect(page.getByText("Battle Over Britain")).not.toBeVisible();
  await expect(page.getByRole('list')).not.toBeVisible()
  await expect(page.getByText("No Results!")).toBeVisible();
});
