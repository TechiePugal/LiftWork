import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./AuthContext";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Control from "./pages/Controls";
import SystemControl from "./pages/SystemControl";
import Notifications from "./pages/Notifications";
// import Dfrom from "./pages/DFrom";
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { loading } = useAuth();
  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED APP */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="control" element={<Control />} />
          <Route path="system-control" element={<SystemControl />} />
          <Route path="notifications" element={<Notifications />} />
          {/* <Route path="dfrom" element={<Dfrom />} /> */}
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
