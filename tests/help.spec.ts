import test, { expect } from "@playwright/test";

test("github link works", async ({page}) => {
    await page.goto("http://localhost:3000/");
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'), // Wait for the 'popup' event
        page.getByRole('link', { name: 'Visit my Github' }).click() // Click the link that opens the new window
      ]);
    
      // Verify the new page has opened by checking its URL
      await newPage.waitForLoadState();
      expect(newPage.url()).toBe('https://github.com/jackhipperson');

})