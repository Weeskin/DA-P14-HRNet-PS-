import { useState } from 'react'
import WHLogo from './assets/wealth-health-logo.png'
import Select from './components/Select/Select'
import { validateForm } from './data/validation'

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
]

const DEPARTMENTS = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']

const INITIAL_VALUES = {
  firstName: '', lastName: '', dateOfBirth: '', startDate: '',
  street: '', city: '', state: '', zipCode: '', department: 'Sales',
}

const inputClass = 'border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
const errorClass = 'text-xs text-red-500 mt-1'

export default function App() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    console.log('Employee saved:', values)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-primary text-white px-6 py-4 flex items-center gap-4">
        <img src={WHLogo} alt="Wealth Health logo" className="h-10" />
        <h1 className="text-2xl font-medium">Wealth Health</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <a href="#" className="text-primary hover:underline text-sm">
          View Current Employees
        </a>

        <h2 className="text-xl font-medium mt-6 mb-6 text-gray-800">Create Employee</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" value={values.firstName} onChange={handleChange} className={inputClass} />
            {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" value={values.lastName} onChange={handleChange} className={inputClass} />
            {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="dateOfBirth">Date of Birth</label>
            <input id="dateOfBirth" type="text" value={values.dateOfBirth} onChange={handleChange} className={inputClass} />
            {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="startDate">Start Date</label>
            <input id="startDate" type="text" value={values.startDate} onChange={handleChange} className={inputClass} />
            {errors.startDate && <p className={errorClass}>{errors.startDate}</p>}
          </div>

          <fieldset className="border border-gray-300 rounded-md p-4 mt-2">
            <legend className="text-sm font-medium text-gray-700 px-2">Address</legend>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="street">Street</label>
                <input id="street" type="text" value={values.street} onChange={handleChange} className={inputClass} />
                {errors.street && <p className={errorClass}>{errors.street}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="city">City</label>
                <input id="city" type="text" value={values.city} onChange={handleChange} className={inputClass} />
                {errors.city && <p className={errorClass}>{errors.city}</p>}
              </div>
              <Select
                id="state" label="State" options={STATES}
                placeholder="-- Select State --"
                value={values.state} onChange={handleChange}
                error={errors.state}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="zipCode">Zip Code</label>
                <input id="zipCode" type="text" value={values.zipCode} onChange={handleChange} className={inputClass} />
                {errors.zipCode && <p className={errorClass}>{errors.zipCode}</p>}
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
    </div>
  )
}
