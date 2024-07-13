import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Recommended" }).click();
});

test("renders correctly", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Film App" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Favourites" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Favourites" })).toHaveClass(
   /hover:bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Recommended" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Recommended" })).toHaveClass(
    / bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Watch List" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Watch List" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Help" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Help" })).toHaveClass(
    /hover:bg-yellow-600/
  );
  await expect(page.getByRole('heading', { name: 'Recommended' })).toBeVisible();
  await expect(page.getByText("No Results!")).toBeVisible();
});

test("check that favourite buttons add films to recommended", async ({ page }) => {
  await page.getByRole("link", { name: "Search" }).click();
  await page.getByPlaceholder("Enter a film search...").fill("Bat");
  // click favourite
  await page
    .locator("li")
    .filter({ hasText: "Vikings: Battle of Heirs (" })
    .getByRole("img")
    .nth(1)
    .click();
  // check recommended
  await page.getByRole("link", { name: "recommended" }).click();
  await expect(page.getByRole('list')).toBeVisible()
  await expect(page.getByText("No Results!")).not.toBeVisible();
  // get first recommended details
  const firstFilm = await page.locator('li').first().textContent()
  console.log(firstFilm);
  
  // add film to favourites
  await page.getByRole('img', { name: 'Favourite' }).first().click()
  await expect(page.getByText(String(firstFilm))).not.toBeVisible();
  await expect(page.getByText("No Results!")).not.toBeVisible();
});
