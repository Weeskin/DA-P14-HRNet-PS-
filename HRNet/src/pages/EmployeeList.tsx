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

// --- PAGE LISTE DES EMPLOYÉS ENREGISTRÉS, AFFICHÉS DANS LE TABLEAU DATASHEET. ---
export default function EmployeeList() {
  // State et constantes
  const employees = useAppSelector((state) => state.employees.list)
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  // Comportement
  // Mode mesure Lighthouse : /employees?seed=2000 charge public/employees-2000.json.
  // Sur /employees (sans paramètre) rien n'est chargé : l'app reste dans son état normal,
  // et il n'y a donc aucune ligne à commenter/décommenter entre les deux démos.
  useEffect(() => {
    const seedSize = searchParams.get("seed")
    // Chiffres uniquement : le paramètre construit un nom de fichier
    if (seedSize === null || !/^\d+$/.test(seedSize)) {
      return
    }

    let isCancelled = false
    fetch(`${import.meta.env.BASE_URL}employees-${seedSize}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Dataset ${seedSize} introuvable (${response.status})`)
        }
        return response.json() as Promise<Employee[]>
      })
      .then((list) => {
        if (!isCancelled) {
          dispatch(setAll(list))
        }
      })
      .catch(() => {
        // Dataset absent ou illisible : la page reste utilisable avec la liste courante
      })

    return () => {
      isCancelled = true
    }
  }, [searchParams, dispatch])

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
