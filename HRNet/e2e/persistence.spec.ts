import { test, expect } from "@playwright/test"
import { createEmployee } from "./helpers"
import { MOCK_EMPLOYEES } from "./fixtures/employees"

test("persistance : un employé créé survit à un rechargement complet", async ({ page }) => {
  await createEmployee(page, MOCK_EMPLOYEES[0])
  await expect(page.getByRole("cell", { name: MOCK_EMPLOYEES[0].lastName }).first()).toBeVisible()

  await page.reload()
  await expect(page.getByRole("cell", { name: MOCK_EMPLOYEES[0].lastName }).first()).toBeVisible()

  const stored = await page.evaluate(() => localStorage.getItem("employees"))
  expect(JSON.parse(stored!)).toHaveLength(1)
})

test("persistance : le seed localStorage de 2000 employés est lu au chargement", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => {
    const employees = Array.from({ length: 2000 }, (_, index) => ({
      firstName: `Prenom${index}`,
      lastName: `Nom${index}`,
      dateOfBirth: "1990-01-01",
      startDate: "2020-06-15",
      street: `${index} Main St`,
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      department: "Sales",
    }))
    localStorage.setItem("employees", JSON.stringify(employees))
  })

  await page.goto("/employees")
  await expect(page.getByText("Showing 1 to 10 of 2000 entries")).toBeVisible()
})

test("persistance : un localStorage corrompu ne casse pas l'app", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => localStorage.setItem("employees", "{pas du json"))
  await page.goto("/employees")
  await expect(page.getByText("No matching records found")).toBeVisible()
})
