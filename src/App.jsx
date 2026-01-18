import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import NotFound from "./pages/notfound/NotFound";
import Devonxona from "./pages/dashboard/devonxona/Devonxona";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth sahifalari */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard sahifalari */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/devonxona" element={<Devonxona />} />
          </Route>

          {/* Not Found sahifa */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
