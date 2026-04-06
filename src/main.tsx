import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

import App from "./app/App.tsx"
import { store } from "./shared/store"
import "@/style.scss"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
