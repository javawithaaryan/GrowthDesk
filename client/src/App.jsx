import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import Reports from "./pages/Reports";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          gutter={10}
          toastOptions={{
            duration: 3500,
            style: {
              background: "var(--surface-card, #1a1f2e)",
              color: "var(--text-primary, #e6edf3)",
              border: "1px solid var(--border, #21262d)",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              fontWeight: "500",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)",
              backdropFilter: "blur(8px)",
              maxWidth: "340px",
            },
            success: {
              iconTheme: { primary: "#22c55e", secondary: "transparent" },
              style: {
                background: "var(--surface-card, #1a1f2e)",
                color: "var(--text-primary, #e6edf3)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderLeft: "3px solid #22c55e",
              },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "transparent" },
              style: {
                background: "var(--surface-card, #1a1f2e)",
                color: "var(--text-primary, #e6edf3)",
                border: "1px solid rgba(248,113,113,0.25)",
                borderLeft: "3px solid #f87171",
              },
            },
          }}
        />
        <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/leads"
  element={
    <ProtectedRoute>
      <Leads />
    </ProtectedRoute>
  }
/>
<Route
  path="/pipeline"
  element={
    <ProtectedRoute>
      <Pipeline />
    </ProtectedRoute>
  }
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
<Route
  path="/ai-assistant"
  element={
    <ProtectedRoute>
      <AIAssistant />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;