// Forme d'un employé (valeurs du formulaire et entrées du store).
export interface Employee {
  firstName: string
  lastName: string
  dateOfBirth: string
  startDate: string
  street: string
  city: string
  state: string
  zipCode: string
  department: string
}

// Erreurs de validation : un message optionnel par champ.
export type FormErrors = Partial<Record<keyof Employee, string>>
