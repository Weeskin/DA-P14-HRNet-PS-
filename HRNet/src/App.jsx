import { Routes, Route, Link } from "react-router-dom"
import WHLogo from "./assets/wealth-health-logo.png"
import CreateEmployee from "./pages/CreateEmployee"
import EmployeeList from "./pages/EmployeeList"

// --- LAYOUT GLOBAL (EN-TÊTE PARTAGÉ) ET DÉFINITION DES ROUTES DE L'APPLICATION. ---
export default function App() {
  // Rendu du composant
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-primary text-white px-6 py-4 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-4">
          <img src={WHLogo} alt="Wealth Health logo" className="h-10" />
          <h1 className="text-2xl font-medium">Wealth Health</h1>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </div>
  )
}
