import { test, expect } from "@playwright/test";

const mockApiNoResults = {
  data: {
    results: [],
  },
};

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Search" }).click();
});

test("renders correctly", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Film App" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search" })).toHaveClass(
    / bg-yellow-600/
  );
  await expect(page.getByRole("link", { name: "Favourites" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Favourites" })).toHaveClass(
    /hover:bg-yellow-600/
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
  await expect(page.getByPlaceholder("Enter a film search...")).toBeVisible();
  await expect(page.getByText("Type 3 letters to start search")).toBeVisible();
});

test("search instruction/loading/results render at the correct points", async ({
  page,
}) => {
  // on load
  await expect(page.getByText("Type 3 letters to start search")).toBeVisible();
  await expect(page.getByText("Loading...")).not.toBeVisible();
  await expect(page.getByRole("list")).not.toBeVisible();
  const searchBar = page.getByPlaceholder("Enter a film search...");

  // 1 letter
  await searchBar.fill("B");
  await expect(page.getByText("Type 3 letters to start search")).toBeVisible();
  await expect(page.getByText("Loading...")).not.toBeVisible();
  await expect(page.getByRole("list")).not.toBeVisible();

  // 2 letters
  await searchBar.fill("Ba");
  await expect(page.getByText("Type 3 letters to start search")).toBeVisible();
  await expect(page.getByText("Loading...")).not.toBeVisible();
  await expect(page.getByRole("list")).not.toBeVisible();

  // 3 letters
  await searchBar.fill("Bat");
  await expect(
    page.getByText("Type 3 letters to start search")
  ).not.toBeVisible();
  await expect(page.getByText("Loading...")).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();

  // back to 2 letters
  await searchBar.fill("Ba");
  await expect(page.getByText("Type 3 letters to start search")).toBeVisible();
  await expect(page.getByText("Loading...")).not.toBeVisible();
  await expect(page.getByRole("list")).not.toBeVisible();
});

test("check that favourite and watchlist button works", async ({ page }) => {
  await page.getByPlaceholder("Enter a film search...").fill("Bat");
  // click favourite
  await page
    .locator("li")
    .filter({ hasText: "The Batman (2022)In his" })
    .getByRole("img")
    .nth(1)
    .click();
  // click watchlist
  await page
    .locator("li")
    .filter({ hasText: "Vikings: Battle of Heirs (" })
    .getByRole("img")
    .nth(2)
    .click();
  //open modal and click favourite
  await page
    .locator("li")
    .filter({ hasText: "Batman Begins (2005)Driven by" })
    .click();
  await page.getByRole("img", { name: "Favourites" }).click();
  await page.getByRole("img", { name: "Close" }).click();
  // open modal and click watchlist
  await page.getByRole("img", { name: "Battle Over Britain" }).click();
  await page.getByRole("img", { name: "WatchList" }).click();
  await page.getByRole("img", { name: "Close" }).click();
  // check favourites
  await page.getByRole("link", { name: "Favourites" }).click();
  await expect(page.getByText("The Batman (2022)")).toBeVisible();
  await expect(page.getByText("Batman Begins (2005)")).toBeVisible();
  // check watchlist
  await page.getByRole("link", { name: "Watch List" }).click();
  await expect(page.getByText("Vikings: Battle of Heirs")).toBeVisible();
  await expect(page.getByText("Battle Over Britain")).toBeVisible();
});

test("api error", async ({ page }) => {
  // Default mock route setup for success
  await page.route("https://api.themoviedb.org/3/search/movie?*", (route) =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify(mockApiNoResults),
    })
  );
  await page.getByPlaceholder("Enter a film search...").fill("Bat");
  await expect(page.getByRole("list")).not.toBeVisible();
  await expect(
    page.getByText("Type 3 letters to start search")
  ).not.toBeVisible();
  await expect(page.getByText("Error: http error: status")).toBeVisible();
});

test("no results", async ({ page }) => {
  // Default mock route setup for success
  await page.route("https://api.themoviedb.org/3/search/movie?*", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockApiNoResults),
    })
  );
  await page.getByPlaceholder("Enter a film search...").fill("Bat");
  await expect(page.getByRole("list")).not.toBeVisible();
  await expect(
    page.getByText("Type 3 letters to start search")
  ).not.toBeVisible();
  await expect(page.getByText("No Results!")).toBeVisible();
});
