import test, { expect } from "@playwright/test";

test("should display a list of books", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page.getByText("Essentialism")).toHaveCount(1);
  await expect(page.getByText("The 4-Hour Workweek")).toHaveCount(1);
  await page.getByRole("button", { name: "Delete Essentialism" }).click();
});
