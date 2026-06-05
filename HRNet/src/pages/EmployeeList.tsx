import { Link } from "react-router-dom"
import DataSheet from "../components/DataSheet/DataSheet"
import { useAppSelector } from "../store/hooks"
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

// --- PAGE LISTE DES EMPLOYÉS ENREGISTRÉS, AFFICHÉS DANS LE TABLEAU DATASHEET. ---
export default function EmployeeList() {
  // State et constantes
  const employees = useAppSelector((state) => state.employees.list)

  // Rendu du composant
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
