import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import "wh-react-datepicker/dist/style.css"
import App from "./App"
import { store } from "./store/store"

// Expose the store for console debugging — never in the production bundle.
// Demo seeds now use the URL parameter approach (see lighthouse-seed-2000.txt).
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
