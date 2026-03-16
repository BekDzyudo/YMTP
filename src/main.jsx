import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import './i18n'; // i18n konfiguratsiyasini yuklash

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GlobalContextProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </GlobalContextProvider>
  </AuthProvider>,
);
