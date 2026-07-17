import { test, expect } from "@playwright/test"

// --- REMPLIT UN CHAMP DATEPICKER (FORMAT MM/DD/YYYY, VALIDATION AU BLUR). ---
async function fillDatePicker(page: import("@playwright/test").Page, label: string, mmddyyyy: string) {
  await page.getByLabel(label).fill(mmddyyyy)
  // Le DatePicker valide et propage la valeur ISO à onBlur
  await page.getByLabel(label).press("Tab")
}

test.describe("Page d'accueil — CreateEmployee", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("affiche le titre de la page et le lien vers la liste", async ({ page }) => {
    await expect(page).toHaveTitle(/Wealth Health/)
    await expect(page.getByRole("heading", { name: "Create Employee" })).toBeVisible()
    await expect(page.getByRole("link", { name: "View Current Employees" })).toBeVisible()
  })

  test("affiche tous les champs du formulaire", async ({ page }) => {
    await expect(page.getByLabel("First Name")).toBeVisible()
    await expect(page.getByLabel("Last Name")).toBeVisible()
    await expect(page.getByLabel("Date of Birth")).toBeVisible()
    await expect(page.getByLabel("Start Date")).toBeVisible()
    await expect(page.getByLabel("Street")).toBeVisible()
    await expect(page.getByLabel("City")).toBeVisible()
    await expect(page.getByLabel("State")).toBeVisible()
    await expect(page.getByLabel("Zip Code")).toBeVisible()
    await expect(page.getByLabel("Department")).toBeVisible()
    await expect(page.getByRole("button", { name: "Save" })).toBeVisible()
  })

  test("affiche des erreurs de validation si le formulaire est soumis vide", async ({ page }) => {
    await page.getByRole("button", { name: "Save" }).click()
    // Au moins un message d'erreur doit apparaître (ex: "Required.")
    await expect(page.getByText("Required.").first()).toBeVisible()
  })
})

test.describe("Création d'un employé — flux complet", () => {
  test("crée un employé, affiche la modale de confirmation et redirige vers la liste", async ({ page }) => {
    await page.goto("/")

    // Champs texte
    await page.getByLabel("First Name").fill("Alice")
    await page.getByLabel("Last Name").fill("Dupont")
    await page.getByLabel("Street").fill("12 Elm Street")
    await page.getByLabel("City").fill("Springfield")
    await page.getByLabel("Zip Code").fill("12345")

    // State
    await page.getByLabel("State").selectOption({ label: "Alabama" })

    // Dates (MM/DD/YYYY) — le DatePicker valide à onBlur
    await fillDatePicker(page, "Date of Birth", "06/15/1990")
    await fillDatePicker(page, "Start Date", "03/01/2020")

    // Soumission
    await page.getByRole("button", { name: "Save" }).click()

    // Modale de confirmation
    await expect(page.getByText("Employee Created!")).toBeVisible()
    await expect(page.getByRole("dialog")).toBeVisible()

    // Fermer la modale → /employees
    await page.getByRole("button", { name: "View Current Employees" }).click()
    await expect(page).toHaveURL(/\/employees/)
    await expect(page.getByRole("heading", { name: /employees/i })).toBeVisible()
  })
})
