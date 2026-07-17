import { test, expect } from "@playwright/test"

// --- REMPLIT UN CHAMP DATEPICKER (FORMAT MM/DD/YYYY, VALIDATION AU BLUR). ---
async function fillDatePicker(page: import("@playwright/test").Page, label: string, mmddyyyy: string) {
  await page.getByLabel(label).fill(mmddyyyy)
  await page.getByLabel(label).press("Tab")
}

test.describe("Page EmployeeList", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/employees")
  })

  test("affiche la page de liste des employés", async ({ page }) => {
    await expect(page).toHaveTitle(/Wealth Health/)
    await expect(page.getByRole("heading", { name: /employees/i })).toBeVisible()
  })

  test("affiche un tableau ou un message quand la liste est vide", async ({ page }) => {
    // Soit un tableau visible, soit un message "no employees" / "aucun"
    const table = page.getByRole("table")
    const emptyMessage = page.getByText(/no employee|aucun/i)
    const hasTable = await table.isVisible().catch(() => false)
    const hasEmptyMessage = await emptyMessage.isVisible().catch(() => false)
    expect(hasTable || hasEmptyMessage).toBe(true)
  })
})

test.describe("Employé créé — apparaît dans la liste", () => {
  test("l'employé soumis via le formulaire est visible dans la liste", async ({ page }) => {
    await page.goto("/")

    await page.getByLabel("First Name").fill("Bob")
    await page.getByLabel("Last Name").fill("Martin")
    await page.getByLabel("Street").fill("5 Oak Avenue")
    await page.getByLabel("City").fill("Chicago")
    await page.getByLabel("Zip Code").fill("60601")
    await page.getByLabel("State").selectOption({ label: "Illinois" })

    await fillDatePicker(page, "Date of Birth", "05/20/1985")
    await fillDatePicker(page, "Start Date", "01/10/2022")

    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Employee Created!")).toBeVisible()
    await page.getByRole("button", { name: "View Current Employees" }).click()

    await expect(page).toHaveURL(/\/employees/)
    await expect(page.getByText("Bob")).toBeVisible()
    await expect(page.getByText("Martin")).toBeVisible()
  })
})
