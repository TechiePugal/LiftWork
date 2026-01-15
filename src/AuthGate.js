import { useAuth } from "./AuthContext";

export default function AuthGate({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  // ⛔ DO NOT mount LiftProvider until logged in
  if (!isLoggedIn) {
    return children; // login page still renders
  }

  return children;
}
