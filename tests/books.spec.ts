import test, { expect } from "@playwright/test";

test("should display books, and support adding and deleting a book", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");

  // Store a locator for reuse
  const book1 = page.getByText("Essentialism");
  const newBookTitle = "New Book";

  await expect(book1).toHaveCount(1);
  await expect(page.getByText("The 4-Hour Workweek")).toHaveCount(1);

  // Test adding a new book
  await page.getByRole("link", { name: "Add Book" }).click();
  // TODO: Test that the "Add Book" header displays, and the URL is /manage-book.
  await page.getByLabel("Title").fill(newBookTitle);
  await page.getByLabel("Subject").fill("Self-help");
  await page.getByRole("button", { name: "Add Book" }).click();

  // Now should have been redirected to the home page
  await expect(page).toHaveURL("http://localhost:5173/");

  // book should now display because we were redirected to the book page
  await expect(page.getByText(newBookTitle)).toHaveCount(1);

  await page.getByRole("button", { name: "Delete " + newBookTitle }).click();
  await expect(page.getByText(newBookTitle)).toHaveCount(0);
});
