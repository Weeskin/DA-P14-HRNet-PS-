import { useMemo, useState } from "react"

const PAGE_SIZES = [10, 25, 50, 100]

// --- COMPARE DEUX VALEURS POUR LE TRI : NUMÉRIQUE SI POSSIBLE, SINON ALPHABÉTIQUE. ---
const compareValues = (a, b) => {
  const numA = Number(a)
  const numB = Number(b)
  if (!Number.isNaN(numA) && !Number.isNaN(numB) && a !== "" && b !== "") {
    return numA - numB
  }
  return String(a ?? "").localeCompare(String(b ?? ""))
}

// --- TABLEAU RÉUTILISABLE EN REACT PUR : REMPLACE LE PLUGIN JQUERY DATATABLES (RECHERCHE, TRI, PAGINATION). ---
export default function DataSheet({ columns, data }) {
  // State et constantes
  const [search, setSearch] = useState("")
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key: null, dir: "asc" })

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return data
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(term)),
    )
  }, [data, columns, search])

  const sorted = useMemo(() => {
    if (!sort.key) return filtered
    const result = [...filtered].sort((a, b) => compareValues(a[sort.key], b[sort.key]))
    return sort.dir === "desc" ? result.reverse() : result
  }, [filtered, sort])

  const totalEntries = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const pageRows = sorted.slice(startIndex, startIndex + pageSize)

  const firstShown = totalEntries === 0 ? 0 : startIndex + 1
  const lastShown = Math.min(startIndex + pageSize, totalEntries)

  // Comportement

  // --- BASCULE LE TRI SUR UNE COLONNE (ASC/DESC) OU L'ACTIVE SI ELLE EST INACTIVE. ---
  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    )
  }

  // --- MET À JOUR LA RECHERCHE ET REVIENT À LA PREMIÈRE PAGE POUR ÉVITER UNE PAGE VIDE. ---
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  // --- CHANGE LE NOMBRE D'ENTRÉES PAR PAGE ET REVIENT À LA PREMIÈRE PAGE. ---
  const handlePageSize = (e) => {
    setPageSize(Number(e.target.value))
    setPage(1)
  }

  // Rendu du composant
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm text-gray-700 flex items-center gap-2">
          Show
          <select
            value={pageSize}
            onChange={handlePageSize}
            className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          entries
        </label>

        <label className="text-sm text-gray-700 flex items-center gap-2">
          Search:
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              {columns.map((col) => {
                const active = sort.key === col.key
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-3 py-2 font-medium text-gray-700 cursor-pointer select-none whitespace-nowrap hover:bg-gray-50"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <span className="text-gray-400 text-xs">
                        {active ? (sort.dir === "asc" ? "▲" : "▼") : "⇅"}
                      </span>
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-gray-500">
                  No matching records found
                </td>
              </tr>
            ) : (
              pageRows.map((row, rowIndex) => (
                <tr key={startIndex + rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-2 text-gray-800 whitespace-nowrap">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <span>
          Showing {firstShown} to {lastShown} of {totalEntries} entries
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
