import { useEffect, useRef } from "react"
import type { MouseEvent, ReactNode } from "react"
import FocusTrap from "../FocusTrap/FocusTrap"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

// --- MODALE RÉUTILISABLE BASÉE SUR LE <dialog> NATIF (REMPLACE LE PLUGIN JQUERY jquery-modal). ---
// showModal() gère le backdrop, la mise en inert de la page et la touche Échap ;
// le focus clavier est confiné par le composant FocusTrap.
export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // State et constantes
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Comportement

  // --- SYNCHRONISE L'OUVERTURE/FERMETURE NATIVE DU <dialog> AVEC LA PROP isOpen. ---
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) { return }
    if (isOpen && !dialog.open) { dialog.showModal() }
    else if (!isOpen && dialog.open) { dialog.close() }
  }, [isOpen])

  // --- FERME EN CLIQUANT SUR LE BACKDROP (UN CLIC SUR LE BACKDROP A POUR CIBLE LE <dialog>). ---
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) { dialogRef.current?.close() }
  }

  // Rendu du composant
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-label={title ?? "Dialog"}
      className="m-auto p-0 border-0 bg-transparent max-w-sm w-full backdrop:bg-black/50"
    >
      <FocusTrap isActive={isOpen}>
        <div className="relative bg-white rounded-lg shadow-xl p-6 text-center">
          {title && <h2 className="text-lg font-medium text-gray-800 mb-2">{title}</h2>}
          <div className="text-gray-700">{children}</div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            &times;
          </button>
        </div>
      </FocusTrap>
    </dialog>
  )
}
