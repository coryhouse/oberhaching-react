import test, { expect } from "@playwright/test";

test("should display books, and support adding and deleting a book", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");

  // Store a locator for reuse
  const book1 = page.getByText("Essentialism");
  const newBookTitle = "New Book";
  const loadingBooksSpinner = page.getByRole("progressbar", {
    name: "Loading books",
  });
  const addButton = page.getByRole("button", { name: "Add Book" });
  const addBookSpinner = page.getByRole("progressbar", { name: "Saving" });

  // Spinner should initially display, then hide
  await expect(loadingBooksSpinner).toHaveCount(1);
  await expect(loadingBooksSpinner).toHaveCount(0);

  await expect(book1).toHaveCount(1);
  await expect(page.getByText("The 4-Hour Workweek")).toHaveCount(1);

  // Test adding a new book
  await page.getByRole("link", { name: "Add Book" }).click();

  // TODO: Test that the "Add Book" header displays, and the URL is /manage-book.
  await page.getByLabel("Title").fill(newBookTitle);
  await page.getByLabel("Subject").fill("Self-help");
  await addButton.click();

  // Show loading status
  await expect(addBookSpinner).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Saving..." })).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Saving..." })).toBeDisabled();

  // Now should have been redirected to the home page
  await expect(page).toHaveURL("http://localhost:5173/");

  // book should now display because we were redirected to the book page
  await expect(page.getByText(newBookTitle)).toHaveCount(1);

  await page.getByRole("button", { name: "Delete " + newBookTitle }).click();
  await expect(page.getByText(newBookTitle)).toHaveCount(0);
});
