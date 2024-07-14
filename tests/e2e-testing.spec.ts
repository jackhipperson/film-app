import { test, expect } from "@playwright/test";

test("good path", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Film App/);

  // Expect help page to be displayed
  await expect(
    page.getByText(
      /Welcome to the Film App! You can Search for films, save the films you love to your Favourites, get suggestions based on your Favourites and save them in your WatchList for later!/i
    )
  ).toBeVisible;

  // Click Search and check that search page renders
  await page.getByRole("link", { name: "Search" }).click();
  await expect(page.getByText(/Type 3 letters to start search/i)).toBeVisible();

  // Enter search 'Batman Begins' into searchbar
  await page.getByPlaceholder("Enter a film search...").fill("Batman Begins");
  await expect(page.getByText(/Loading.../i)).toBeVisible();

  // locate batman begins and click to open the modal
  const batmanFilmItem = page.getByText("Batman Begins (2005)");
  await expect(batmanFilmItem).toBeVisible();
  await batmanFilmItem.click();
  await expect(page.getByText(/Rating:/i)).toBeVisible();

  // click heart button to add to favourites
  await page.getByRole("img", { name: "Favourites" }).click();

  // close modal
  await page.getByRole("img", { name: "Close" }).click();

  // navigate to favourites and check that batman begins is in the list
  await page.getByRole("link", { name: "Favourites" }).click();
  await expect(page.getByText("Batman Begins (2005)")).toBeVisible();

  // navigate to recommended
  await page.getByRole("link", { name: "Recommended" }).click();
  await expect(page.getByText("The Dark Knight (2008)")).toBeVisible();

  // click first item and add to watchlist
  await page.getByText("The Dark Knight (2008)").click();
  await page.getByRole("img", { name: "WatchList" }).click();

  // close modal
  await page.getByRole("img", { name: "Close" }).click();

  // navigate to watch list and check that item is there
  await page.getByRole("link", { name: "Recommended" }).click();
  await expect(page.getByText("The Dark Knight (2008)")).toBeVisible();

  // click film app logo and return to '/'
  await page.getByRole('heading', { name: 'Film App' }).click()
  await expect(page.getByText('Welcome to the Film App! You')).toBeVisible();
});
