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
        <Toaster position="top-right" />
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