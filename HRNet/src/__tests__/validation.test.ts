import { describe, it, expect } from "vitest"
import { validateForm, FIELD_LIMITS } from "../utils/validation"
import type { Employee } from "../types"

// Valid employee used as base in all tests — fields to test are overridden.
const VALID_EMPLOYEE: Employee = {
  firstName: "Jean",
  lastName: "Dupont",
  dateOfBirth: "1990-06-15",
  startDate: "2010-06-15",
  street: "123 Main St",
  city: "Springfield",
  state: "IL",
  zipCode: "62701",
  department: "Sales",
}

// --- HELPER: returns an employee with an overridden field. ---
const withField = (field: Partial<Employee>): Employee => ({ ...VALID_EMPLOYEE, ...field })

describe("validateForm", () => {

  describe("firstName", () => {
    it("accepte un prénom valide", () => {
      expect(validateForm(VALID_EMPLOYEE).firstName).toBeUndefined()
    })

    it("rejette un prénom vide", () => {
      expect(validateForm(withField({ firstName: "" })).firstName).toBe("Required.")
    })

    it("rejette un prénom avec des chiffres", () => {
      expect(validateForm(withField({ firstName: "Jean2" })).firstName).toBeDefined()
    })

    it("rejette un prénom avec des caractères spéciaux (@, !)", () => {
      expect(validateForm(withField({ firstName: "Jean@" })).firstName).toBeDefined()
    })

    it("accepte un prénom avec tiret (Jean-Pierre)", () => {
      expect(validateForm(withField({ firstName: "Jean-Pierre" })).firstName).toBeUndefined()
    })

    it("accepte un prénom avec apostrophe (O'Brien)", () => {
      expect(validateForm(withField({ firstName: "O'Brien" })).firstName).toBeUndefined()
    })

    it("rejette un prénom qui commence par un tiret", () => {
      expect(validateForm(withField({ firstName: "-Jean" })).firstName).toBeDefined()
    })

    it("rejette un prénom qui finit par une apostrophe", () => {
      expect(validateForm(withField({ firstName: "Jean'" })).firstName).toBeDefined()
    })

    it("rejette un prénom trop long (> 50 caractères)", () => {
      expect(validateForm(withField({ firstName: "A".repeat(FIELD_LIMITS.firstName + 1) })).firstName).toBeDefined()
    })
  })

  describe("lastName", () => {
    it("accepte un nom valide", () => {
      expect(validateForm(VALID_EMPLOYEE).lastName).toBeUndefined()
    })

    it("rejette un nom vide", () => {
      expect(validateForm(withField({ lastName: "" })).lastName).toBe("Required.")
    })

    it("accepte un nom avec tiret (Martin-Dubois)", () => {
      expect(validateForm(withField({ lastName: "Martin-Dubois" })).lastName).toBeUndefined()
    })

    it("rejette un nom trop long", () => {
      expect(validateForm(withField({ lastName: "B".repeat(FIELD_LIMITS.lastName + 1) })).lastName).toBeDefined()
    })
  })

  describe("dateOfBirth", () => {
    it("accepte une date de naissance valide", () => {
      expect(validateForm(VALID_EMPLOYEE).dateOfBirth).toBeUndefined()
    })

    it("rejette une date de naissance vide", () => {
      expect(validateForm(withField({ dateOfBirth: "" })).dateOfBirth).toBe("Required.")
    })

    it("rejette une date de naissance dans le futur", () => {
      expect(validateForm(withField({ dateOfBirth: "2099-01-01" })).dateOfBirth).toBe("Date of birth cannot be in the future.")
    })

    it("rejette un employé de moins de 16 ans", () => {
      const today = new Date()
      const tooYoung = `${today.getFullYear() - 10}-01-01`
      expect(validateForm(withField({ dateOfBirth: tooYoung })).dateOfBirth).toBe("Employee must be at least 16 years old.")
    })

    it("rejette un employé de plus de 100 ans", () => {
      expect(validateForm(withField({ dateOfBirth: "1900-01-01" })).dateOfBirth).toBe("Date of birth cannot be more than 100 years ago.")
    })
  })

  describe("startDate", () => {
    it("accepte une date de début valide", () => {
      expect(validateForm(VALID_EMPLOYEE).startDate).toBeUndefined()
    })

    it("rejette une date de début vide", () => {
      expect(validateForm(withField({ startDate: "" })).startDate).toBe("Required.")
    })

    it("rejette une date de début avant les 16 ans de l'employé", () => {
      // Employé né en 1990-06-15 → 16 ans = 2006-06-15
      const errors = validateForm(withField({ dateOfBirth: "1990-06-15", startDate: "2005-01-01" }))
      expect(errors.startDate).toBe("Start date cannot be before the employee's 16th birthday.")
    })
  })

  describe("street", () => {
    it("accepte une rue valide", () => {
      expect(validateForm(VALID_EMPLOYEE).street).toBeUndefined()
    })

    it("rejette une rue vide", () => {
      expect(validateForm(withField({ street: "" })).street).toBe("Required.")
    })

    it("rejette une rue trop longue", () => {
      expect(validateForm(withField({ street: "A".repeat(FIELD_LIMITS.street + 1) })).street).toBeDefined()
    })
  })

  describe("city", () => {
    it("accepte une ville valide", () => {
      expect(validateForm(VALID_EMPLOYEE).city).toBeUndefined()
    })

    it("rejette une ville vide", () => {
      expect(validateForm(withField({ city: "" })).city).toBe("Required.")
    })
  })

  describe("state", () => {
    it("accepte un state sélectionné", () => {
      expect(validateForm(VALID_EMPLOYEE).state).toBeUndefined()
    })

    it("rejette un state non sélectionné", () => {
      expect(validateForm(withField({ state: "" })).state).toBe("Please select a state.")
    })
  })

  describe("zipCode", () => {
    it("accepte un zip code court valide (12345)", () => {
      expect(validateForm(withField({ zipCode: "12345" })).zipCode).toBeUndefined()
    })

    it("accepte un zip code long valide (12345-6789)", () => {
      expect(validateForm(withField({ zipCode: "12345-6789" })).zipCode).toBeUndefined()
    })

    it("rejette un zip code vide", () => {
      expect(validateForm(withField({ zipCode: "" })).zipCode).toBe("Required.")
    })

    it("rejette un zip code trop court (1234)", () => {
      expect(validateForm(withField({ zipCode: "1234" })).zipCode).toBeDefined()
    })

    it("rejette un zip code avec lettres (abcde)", () => {
      expect(validateForm(withField({ zipCode: "abcde" })).zipCode).toBeDefined()
    })

    it("rejette un zip code partiellement invalide (1234a)", () => {
      expect(validateForm(withField({ zipCode: "1234a" })).zipCode).toBeDefined()
    })
  })

  describe("formulaire entièrement valide", () => {
    it("retourne zéro erreur pour un employé valide", () => {
      expect(Object.keys(validateForm(VALID_EMPLOYEE))).toHaveLength(0)
    })
  })
})
