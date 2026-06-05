import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import Select from "../components/Select/Select"
import InputField from "../components/InputField/InputField"
import { validateForm, FIELD_LIMITS } from "../data/validation"
import STATES from "../data/states.json"
import DEPARTMENTS from "../data/departments.json"
import { addEmployee } from "../store/employee-slice"

// Options du menu déroulant State : abréviation comme valeur (stockée), nom complet comme libellé affiché.
const STATE_OPTIONS = STATES.map((state) => ({ value: state.abbreviation, label: state.name }))

const INITIAL_VALUES = {
  firstName: "", lastName: "", dateOfBirth: "", startDate: "",
  street: "", city: "", state: "", zipCode: "", department: "Sales",
}

// --- PAGE FORMULAIRE DE CRÉATION D'UN EMPLOYÉ. ---
export default function CreateEmployee() {
  // State et constantes
  const dispatch = useDispatch()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})

  // Comportement

  // --- MET À JOUR LE CHAMP MODIFIÉ ET EFFACE SON ERREUR ÉVENTUELLE. ---
  const handleChange = (e) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {setErrors((prev) => ({ ...prev, [id]: undefined }))}
  }

  // --- VALIDE LE FORMULAIRE, ENREGISTRE L'EMPLOYÉ DANS LE STORE ET RÉINITIALISE LES CHAMPS. ---
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    dispatch(addEmployee(values))
    setValues(INITIAL_VALUES)
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
        <InputField
          id="dateOfBirth" label="Date of Birth" type="date"
          value={values.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth}
        />
        <InputField
          id="startDate" label="Start Date" type="date"
          value={values.startDate} onChange={handleChange} error={errors.startDate}
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
    </main>
  )
}
