import test, { expect } from "@playwright/test";

test("should display books, and support adding and deleting a book", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  await expect(page.getByText("Essentialism")).toHaveCount(1);
  await expect(page.getByText("The 4-Hour Workweek")).toHaveCount(1);

  // Test adding a new book
  await page
    .getByLabel("Title")
    .fill("The 7 Habits of Highly Effective People");
  await page.getByLabel("Subject").fill("Self-help");
  await page.getByRole("button", { name: "Add Book" }).click();

  // book should now display
  await expect(
    page.getByText("The 7 Habits of Highly Effective People")
  ).toHaveCount(1);

  await page.getByRole("button", { name: "Delete Essentialism" }).click();
  await expect(page.getByText("Essentialism")).toHaveCount(0);
});
