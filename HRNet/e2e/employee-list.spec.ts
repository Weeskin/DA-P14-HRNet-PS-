import { test, expect } from "@playwright/test"
import { createEmployee } from "./helpers"
import { MOCK_EMPLOYEES } from "./fixtures/employees"

test.describe("Page EmployeeList", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/employees")
  })

  test("affiche le titre 'Current Employees'", async ({ page }) => {
    await expect(page).toHaveTitle(/Wealth Health/)
    await expect(page.getByRole("heading", { name: "Current Employees" })).toBeVisible()
  })

  test("affiche le lien 'Home' qui navigue vers la page de création", async ({ page }) => {
    await page.getByRole("link", { name: "Home" }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole("heading", { name: "Create Employee" })).toBeVisible()
  })

  test("affiche le message 'No matching records found' quand la liste est vide", async ({ page }) => {
    await expect(page.getByText("No matching records found")).toBeVisible()
  })

  test("affiche 'Showing 0 to 0 of 0 entries' quand la liste est vide", async ({ page }) => {
    await expect(page.getByText("Showing 0 to 0 of 0 entries")).toBeVisible()
  })
})

test.describe("Employé créé — apparaît dans la liste", () => {
  test("l'employé soumis via le formulaire est visible dans la liste", async ({ page }) => {
    await createEmployee(page, MOCK_EMPLOYEES[0])

    await expect(page).toHaveURL(/\/employees/)
    await expect(page.getByRole("cell", { name: "Alice" })).toBeVisible()
    await expect(page.getByRole("cell", { name: "Anderson" })).toBeVisible()
  })
})
