import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Select from "../components/Select/Select"
import InputField from "../components/InputField/InputField"
import { DatePicker } from "wh-react-datepicker"
import Modal from "../components/Modal/Modal"
import { validateForm, FIELD_LIMITS } from "../data/validation"
import STATES from "../data/states.json"
import DEPARTMENTS from "../data/departments.json"
import { addEmployee } from "../store/employee-slice"
import { useAppDispatch } from "../store/hooks"
import type { Employee, FormErrors } from "../types"

// Options du menu déroulant State : abréviation comme valeur (stockée), nom complet comme libellé affiché.
const STATE_OPTIONS = STATES.map((state) => ({ value: state.abbreviation, label: state.name }))

const INITIAL_VALUES: Employee = {
  firstName: "", lastName: "", dateOfBirth: "", startDate: "",
  street: "", city: "", state: "", zipCode: "", department: "Sales",
}

// --- PAGE FORMULAIRE DE CRÉATION D'UN EMPLOYÉ. ---
export default function CreateEmployee() {
  // State et constantes
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState<Employee>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Comportement

  // --- MET À JOUR UN CHAMP DATE (ISO) ET EFFACE SON ERREUR ÉVENTUELLE. ---
  const handleDateChange = (field: "dateOfBirth" | "startDate") => (isoValue: string) => {
    setValues((prev) => ({ ...prev, [field]: isoValue }))
    if (errors[field]) { setErrors((prev) => ({ ...prev, [field]: undefined })) }
  }

  // --- MET À JOUR LE CHAMP MODIFIÉ ET EFFACE SON ERREUR ÉVENTUELLE. ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const id = e.target.id as keyof Employee
    const { value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) { setErrors((prev) => ({ ...prev, [id]: undefined })) }
  }

  // --- VALIDE LE FORMULAIRE, ENREGISTRE L'EMPLOYÉ DANS LE STORE ET RÉINITIALISE LES CHAMPS. ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    dispatch(addEmployee(values))
    setValues(INITIAL_VALUES)
    setIsModalOpen(true)
  }

  // --- FERME LA MODALE DE CONFIRMATION ET REDIRIGE VERS LA LISTE DES EMPLOYÉS. ---
  const handleCloseModal = () => {
    setIsModalOpen(false)
    navigate("/employees")
  }

  // Rendu du composant
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/employees" className="text-primary hover:underline text-sm">
        View Current Employees
      </Link>

      <h2 className="text-xl font-medium mt-6 mb-6 text-gray-800">Create Employee</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          id="firstName" label="First Name" maxLength={FIELD_LIMITS.firstName}
          value={values.firstName} onChange={handleChange} error={errors.firstName}
        />
        <InputField
          id="lastName" label="Last Name" maxLength={FIELD_LIMITS.lastName}
          value={values.lastName} onChange={handleChange} error={errors.lastName}
        />
        <DatePicker
          id="dateOfBirth" label="Date of Birth"
          value={values.dateOfBirth} onChange={handleDateChange("dateOfBirth")} error={errors.dateOfBirth}
        />
        <DatePicker
          id="startDate" label="Start Date"
          value={values.startDate} onChange={handleDateChange("startDate")} error={errors.startDate}
        />

        <fieldset className="border border-gray-300 rounded-md p-4 mt-2">
          <legend className="text-sm font-medium text-gray-700 px-2">Address</legend>
          <div className="flex flex-col gap-4">
            <InputField
              id="street" label="Street" maxLength={FIELD_LIMITS.street}
              value={values.street} onChange={handleChange} error={errors.street}
            />
            <InputField
              id="city" label="City" maxLength={FIELD_LIMITS.city}
              value={values.city} onChange={handleChange} error={errors.city}
            />
            <Select
              id="state" label="State" options={STATE_OPTIONS}
              placeholder="-- Select State --"
              value={values.state} onChange={handleChange}
              error={errors.state}
            />
            <InputField
              id="zipCode" label="Zip Code" maxLength={FIELD_LIMITS.zipCode}
              value={values.zipCode} onChange={handleChange} error={errors.zipCode}
            />
          </div>
        </fieldset>

        <Select
          id="department" label="Department" options={DEPARTMENTS}
          value={values.department} onChange={handleChange}
        />

        <button
          type="submit"
          className="mt-4 bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition-colors self-start"
        >
          Save
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Confirmation">
        <p className="mb-4">Employee Created!</p>
        <button
          type="button"
          onClick={handleCloseModal}
          className="bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
        >
          View Current Employees
        </button>
      </Modal>
    </main>
  )
}
