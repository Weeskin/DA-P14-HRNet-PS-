import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import Select from "../components/Select/Select"
import { validateForm } from "../data/validation"
import { STATES } from "../data/states"
import { DEPARTMENTS } from "../data/departments"
import { addEmployee } from "../store/employee-slice"

const INITIAL_VALUES = {
  firstName: "", lastName: "", dateOfBirth: "", startDate: "",
  street: "", city: "", state: "", zipCode: "", department: "Sales",
}

const INPUT_CLASS = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
const ERROR_CLASS = "text-xs text-red-500 mt-1"

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
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }))
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
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" value={values.firstName} onChange={handleChange} className={INPUT_CLASS} />
          {errors.firstName && <p className={ERROR_CLASS}>{errors.firstName}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" value={values.lastName} onChange={handleChange} className={INPUT_CLASS} />
          {errors.lastName && <p className={ERROR_CLASS}>{errors.lastName}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="dateOfBirth">Date of Birth</label>
          <input id="dateOfBirth" type="date" value={values.dateOfBirth} onChange={handleChange} className={INPUT_CLASS} />
          {errors.dateOfBirth && <p className={ERROR_CLASS}>{errors.dateOfBirth}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="startDate">Start Date</label>
          <input id="startDate" type="date" value={values.startDate} onChange={handleChange} className={INPUT_CLASS} />
          {errors.startDate && <p className={ERROR_CLASS}>{errors.startDate}</p>}
        </div>

        <fieldset className="border border-gray-300 rounded-md p-4 mt-2">
          <legend className="text-sm font-medium text-gray-700 px-2">Address</legend>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="street">Street</label>
              <input id="street" type="text" value={values.street} onChange={handleChange} className={INPUT_CLASS} />
              {errors.street && <p className={ERROR_CLASS}>{errors.street}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="city">City</label>
              <input id="city" type="text" value={values.city} onChange={handleChange} className={INPUT_CLASS} />
              {errors.city && <p className={ERROR_CLASS}>{errors.city}</p>}
            </div>
            <Select
              id="state" label="State" options={STATES}
              placeholder="-- Select State --"
              value={values.state} onChange={handleChange}
              error={errors.state}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="zipCode">Zip Code</label>
              <input id="zipCode" type="text" value={values.zipCode} onChange={handleChange} className={INPUT_CLASS} />
              {errors.zipCode && <p className={ERROR_CLASS}>{errors.zipCode}</p>}
            </div>
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
