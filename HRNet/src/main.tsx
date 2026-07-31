import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import "wh-react-datepicker/dist/style.css"
import App from "./App"
import { store } from "./store/store"

// Expose le store pour le débogage en console — jamais dans le bundle de production.
// Les seeds de démo passent désormais par le localStorage (voir lighthouse-seed-2000.txt).
if (import.meta.env.DEV) {
  ;(window as unknown as { __store__: typeof store }).__store__ = store
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
