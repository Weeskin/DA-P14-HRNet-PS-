import { test, expect } from "@playwright/test"
import { createEmployee } from "./helpers"
import { MOCK_EMPLOYEES } from "./fixtures/employees"

// Mode mesure Lighthouse : /employees?seed=2000 charge public/employees-2000.json.
test("seed : ?seed=2000 charge les 2000 employés du dataset statique", async ({ page }) => {
  await page.goto("/employees?seed=2000")
  await expect(page.getByText("Showing 1 to 10 of 2000 entries")).toBeVisible()
})

test("seed : le dataset n'est pas persisté dans le localStorage", async ({ page }) => {
  await page.goto("/employees?seed=2000")
  await expect(page.getByText("Showing 1 to 10 of 2000 entries")).toBeVisible()

  expect(await page.evaluate(() => localStorage.getItem("employees"))).toBeNull()

  // Retour à l'app normale : la démo de perf n'a rien laissé derrière elle
  await page.goto("/employees")
  await expect(page.getByText("No matching records found")).toBeVisible()
})

test("seed : une liste déjà persistée n'est pas écrasée par la démo", async ({ page }) => {
  await createEmployee(page, MOCK_EMPLOYEES[0])
  await expect(page.getByRole("cell", { name: MOCK_EMPLOYEES[0].lastName }).first()).toBeVisible()

  await page.goto("/employees?seed=2000")
  await expect(page.getByText("Showing 1 to 10 of 2000 entries")).toBeVisible()

  await page.goto("/employees")
  await expect(page.getByRole("cell", { name: MOCK_EMPLOYEES[0].lastName }).first()).toBeVisible()
  expect(JSON.parse((await page.evaluate(() => localStorage.getItem("employees")))!)).toHaveLength(1)
})

test("seed : un paramètre non numérique est ignoré", async ({ page }) => {
  await page.goto("/employees?seed=../../etc/passwd")
  await expect(page.getByText("No matching records found")).toBeVisible()
})

test("seed : un dataset inexistant laisse la page utilisable", async ({ page }) => {
  await page.goto("/employees?seed=999999")
  await expect(page.getByText("No matching records found")).toBeVisible()
})
