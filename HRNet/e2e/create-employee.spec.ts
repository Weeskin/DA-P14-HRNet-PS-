import { test, expect } from "@playwright/test"
import { fillDatePicker } from "./helpers"

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

  test("le champ Department a 'Sales' comme valeur par défaut", async ({ page }) => {
    await expect(page.getByLabel("Department")).toHaveValue("Sales")
  })

  test("le lien 'View Current Employees' navigue vers /employees", async ({ page }) => {
    await page.getByRole("link", { name: "View Current Employees" }).click()
    await expect(page).toHaveURL(/\/employees/)
  })

  test("le logo dans le header navigue vers la page d'accueil", async ({ page }) => {
    await page.goto("/employees")
    await page.getByRole("link", { name: "Wealth Health" }).click()
    await expect(page).toHaveURL(/\/$/)
  })
})

test.describe("Validation du formulaire — champ par champ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("soumission vide → affiche 'Required.' sur les champs obligatoires", async ({ page }) => {
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Required.").first()).toBeVisible()
  })

  test("prénom avec chiffres → message d'erreur format", async ({ page }) => {
    await page.getByLabel("First Name").fill("Alice123")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Letters, single hyphens/apostrophes only, no leading or trailing separator.").first()).toBeVisible()
  })

  test("code postal invalide → message d'erreur format", async ({ page }) => {
    await page.getByLabel("Zip Code").fill("ABCDE")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Enter a valid ZIP code (e.g. 12345 or 12345-6789).")).toBeVisible()
  })

  test("date de naissance dans le futur → erreur", async ({ page }) => {
    await fillDatePicker(page, "Date of Birth", "01/01/2030")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Date of birth cannot be in the future.")).toBeVisible()
  })

  test("employé de moins de 16 ans → erreur", async ({ page }) => {
    // Naissance il y a 10 ans
    await fillDatePicker(page, "Date of Birth", "01/01/2016")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Employee must be at least 16 years old.")).toBeVisible()
  })

  test("start date avant les 16 ans de l'employé → erreur", async ({ page }) => {
    // Naissance 1990, start date 2000 (employé a 10 ans → invalide)
    await fillDatePicker(page, "Date of Birth", "01/01/1990")
    await fillDatePicker(page, "Start Date", "01/01/2000")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Start date cannot be before the employee's 16th birthday.")).toBeVisible()
  })
})

test.describe("Création d'un employé — flux complet", () => {
  test("crée un employé, affiche la modale de confirmation et redirige vers la liste", async ({ page }) => {
    await page.goto("/")

    await page.getByLabel("First Name").fill("Alice")
    await page.getByLabel("Last Name").fill("Dupont")
    await page.getByLabel("Street").fill("12 Elm Street")
    await page.getByLabel("City").fill("Springfield")
    await page.getByLabel("Zip Code").fill("12345")
    await page.getByLabel("State").selectOption({ label: "Alabama" })
    await fillDatePicker(page, "Date of Birth", "06/15/1990")
    await fillDatePicker(page, "Start Date", "03/01/2020")

    await page.getByRole("button", { name: "Save" }).click()

    // Modale avec titre et message
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByText("Confirmation")).toBeVisible()
    await expect(page.getByText("Employee Created!")).toBeVisible()

    // Fermer la modale → /employees
    await page.getByRole("button", { name: "View Current Employees" }).click()
    await expect(page).toHaveURL(/\/employees/)
  })

  test("après création, le formulaire est réinitialisé", async ({ page }) => {
    await page.goto("/")

    await page.getByLabel("First Name").fill("Test")
    await page.getByLabel("Last Name").fill("User")
    await page.getByLabel("Street").fill("1 Main St")
    await page.getByLabel("City").fill("Boston")
    await page.getByLabel("Zip Code").fill("02101")
    await page.getByLabel("State").selectOption({ label: "Massachusetts" })
    await fillDatePicker(page, "Date of Birth", "05/10/1988")
    await fillDatePicker(page, "Start Date", "06/01/2015")

    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Employee Created!")).toBeVisible()

    // Fermer la modale et revenir au formulaire
    await page.getByRole("button", { name: "View Current Employees" }).click()
    await page.goto("/")

    // Le champ First Name doit être vide
    await expect(page.getByLabel("First Name")).toHaveValue("")
  })
})
