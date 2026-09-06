import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import DataSheet from "../components/DataTable/DataSheet"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setAll } from "../store/employee-slice"
import type { Employee } from "../types"

const COLUMNS: { key: keyof Employee & string; label: string }[] = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "startDate", label: "Start Date" },
  { key: "department", label: "Department" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
]

// --- EMPLOYEE LIST PAGE, DISPLAYS SAVED EMPLOYEES IN THE DATASHEET TABLE. ---
export default function EmployeeList() {
  // State and constants
  const employees = useAppSelector((state) => state.employees.list)
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  // Behavior
  // Lighthouse measurement mode: /employees?seed=2000 loads public/employees-2000.json.
  // On /employees (without parameter) nothing is loaded: the app stays in its normal state,
  // so there is nothing to comment/uncomment between the two demos.
  useEffect(() => {
    const seedSize = searchParams.get("seed")
    // Digits only: the parameter is used to build a filename
    if (seedSize === null || !/^\d+$/.test(seedSize)) {
      return
    }

    let isCancelled = false
    fetch(`${import.meta.env.BASE_URL}employees-${seedSize}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Dataset ${seedSize} not found (${response.status})`)
        }
        return response.json() as Promise<Employee[]>
      })
      .then((list) => {
        if (!isCancelled) {
          dispatch(setAll(list))
        }
      })
      .catch(() => {
        // Dataset missing or unreadable: the page stays usable with the current list
      })

    return () => {
      isCancelled = true
    }
  }, [searchParams, dispatch])

  // Component render
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-primary hover:underline text-sm">
        Home
      </Link>

      <h2 className="text-xl font-medium mt-6 mb-6 text-gray-800">Current Employees</h2>

      <DataSheet columns={COLUMNS} data={employees} />
    </main>
  )
}
