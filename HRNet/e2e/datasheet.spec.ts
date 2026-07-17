import { test as base, expect } from "@playwright/test"
import type { Page } from "@playwright/test"
import { createEmployee } from "./helpers"
import { MOCK_EMPLOYEES } from "./fixtures/employees"

// --- FIXTURE WORKER-SCOPED : CRÉE LES 12 EMPLOYÉS UNE SEULE FOIS POUR TOUT LE FICHIER. ---
// Évite de recréer les données à chaque test (performances + cohérence).
const test = base.extend<{}, { populatedPage: Page }>({
  populatedPage: [async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    for (const emp of MOCK_EMPLOYEES) {
      await createEmployee(page, emp)
    }
    // La page est sur /employees avec 12 employés dans le store

    await use(page)
    await context.close()
  }, { scope: "worker" }],
})

// Les tests partagent la même page → exécution sérielle obligatoire.
test.describe.configure({ mode: "serial" })

test.describe("DataSheet — Recherche", () => {
  test.afterEach(async ({ populatedPage }) => {
    // Réinitialise la recherche entre chaque test
    await populatedPage.getByLabel("Search:").fill("")
  })

  test("affiche 12 employés au départ (10 en page 1)", async ({ populatedPage }) => {
    await expect(populatedPage.getByText("Showing 1 to 10 of 12 entries")).toBeVisible()
  })

  test("filtre les résultats selon la recherche", async ({ populatedPage }) => {
    await populatedPage.getByLabel("Search:").fill("Alice")
    await expect(populatedPage.getByText("Showing 1 to 1 of 1 entries")).toBeVisible()
    await expect(populatedPage.getByRole("cell", { name: "Alice" })).toBeVisible()
  })

  test("affiche 'No matching records found' si aucun résultat", async ({ populatedPage }) => {
    await populatedPage.getByLabel("Search:").fill("ZZZinexistant")
    await expect(populatedPage.getByText("No matching records found")).toBeVisible()
    await expect(populatedPage.getByText("Showing 0 to 0 of 0 entries")).toBeVisible()
  })

  test("vider la recherche restaure tous les résultats", async ({ populatedPage }) => {
    await populatedPage.getByLabel("Search:").fill("Alice")
    await expect(populatedPage.getByText("of 1 entries")).toBeVisible()
    await populatedPage.getByLabel("Search:").fill("")
    await expect(populatedPage.getByText("of 12 entries")).toBeVisible()
  })

  test("la recherche est insensible à la casse", async ({ populatedPage }) => {
    await populatedPage.getByLabel("Search:").fill("alice")
    await expect(populatedPage.getByText("of 1 entries")).toBeVisible()
  })
})

test.describe("DataSheet — Tri", () => {
  test.afterEach(async ({ populatedPage }) => {
    // Navigation React Router (client-side) pour préserver le store Redux.
    // page.goto() ferait un rechargement complet qui vide l'état en mémoire.
    await populatedPage.getByRole("link", { name: "Home" }).click()
    await populatedPage.getByRole("link", { name: "View Current Employees" }).click()
  })

  test("cliquer sur 'First Name' trie par ordre alphabétique ASC", async ({ populatedPage }) => {
    await populatedPage.getByRole("columnheader", { name: /First Name/ }).click()
    // Alice doit être la première ligne
    const firstCell = populatedPage.getByRole("row").nth(1).getByRole("cell").first()
    await expect(firstCell).toHaveText("Alice")
  })

  test("cliquer deux fois sur 'First Name' inverse le tri en DESC", async ({ populatedPage }) => {
    await populatedPage.getByRole("columnheader", { name: /First Name/ }).click()
    await populatedPage.getByRole("columnheader", { name: /First Name/ }).click()
    // Kevin ou Laura doit être en tête (dernière lettre alphabétiquement)
    const firstCell = populatedPage.getByRole("row").nth(1).getByRole("cell").first()
    await expect(firstCell).toHaveText("Laura")
  })

  test("l'icône de tri change de ⇅ à ▲ puis ▼", async ({ populatedPage }) => {
    const header = populatedPage.getByRole("columnheader", { name: /First Name/ })
    await expect(header).toContainText("⇅")
    await header.click()
    await expect(header).toContainText("▲")
    await header.click()
    await expect(header).toContainText("▼")
  })
})

test.describe("DataSheet — Pagination", () => {
  test.afterEach(async ({ populatedPage }) => {
    await populatedPage.getByRole("link", { name: "Home" }).click()
    await populatedPage.getByRole("link", { name: "View Current Employees" }).click()
  })

  test("affiche 10 lignes par défaut et le compteur correct", async ({ populatedPage }) => {
    await expect(populatedPage.getByText("Showing 1 to 10 of 12 entries")).toBeVisible()
    // 10 lignes de données + 1 ligne d'en-tête = 11 rows au total
    await expect(populatedPage.getByRole("row")).toHaveCount(11)
  })

  test("le bouton 'Previous' est désactivé sur la page 1", async ({ populatedPage }) => {
    await expect(populatedPage.getByRole("button", { name: "Previous" })).toBeDisabled()
  })

  test("'Next' passe à la page 2 et affiche les 2 entrées restantes", async ({ populatedPage }) => {
    await populatedPage.getByRole("button", { name: "Next" }).click()
    await expect(populatedPage.getByText("Showing 11 to 12 of 12 entries")).toBeVisible()
    await expect(populatedPage.getByText("Page 2 / 2")).toBeVisible()
  })

  test("le bouton 'Next' est désactivé sur la dernière page", async ({ populatedPage }) => {
    await populatedPage.getByRole("button", { name: "Next" }).click()
    await expect(populatedPage.getByRole("button", { name: "Next" })).toBeDisabled()
  })

  test("'Previous' revient à la page 1 depuis la page 2", async ({ populatedPage }) => {
    await populatedPage.getByRole("button", { name: "Next" }).click()
    await populatedPage.getByRole("button", { name: "Previous" }).click()
    await expect(populatedPage.getByText("Showing 1 to 10 of 12 entries")).toBeVisible()
  })

  test("changer le sélecteur 'Show' à 25 affiche tous les employés sur une seule page", async ({ populatedPage }) => {
    await populatedPage.getByLabel("Show").selectOption("25")
    await expect(populatedPage.getByText("Showing 1 to 12 of 12 entries")).toBeVisible()
    await expect(populatedPage.getByRole("button", { name: "Next" })).toBeDisabled()
    await expect(populatedPage.getByRole("button", { name: "Previous" })).toBeDisabled()
  })
})
