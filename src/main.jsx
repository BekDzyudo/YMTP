import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import { installApiLanguageHeader } from "./i18n/i18n";

// Barcha API so'rovlariga tanlangan til (Accept-Language) qo'shiladi
installApiLanguageHeader();

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <LanguageProvider>
    <AuthProvider>
      <GlobalContextProvider>
        <App />
        <ToastContainer position="bottom-right" />
      </GlobalContextProvider>
    </AuthProvider>
    </LanguageProvider>
  </HelmetProvider>,
);
