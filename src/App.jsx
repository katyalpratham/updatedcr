// Updated App — dark theme default
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import "./styles/dashboard.css";

function App() {
  
  // Apply theme globally on load and listen for changes
  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem("theme") || "system";
      const root = document.documentElement;
      
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
      } else if (theme === "light") {
        root.removeAttribute("data-theme");
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.setAttribute("data-theme", "dark");
        } else {
          root.removeAttribute("data-theme");
        }
      }
    };

    applyTheme();
    window.addEventListener("storage", applyTheme);
    return () => window.removeEventListener("storage", applyTheme);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;