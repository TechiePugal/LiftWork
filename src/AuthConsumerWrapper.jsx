import { useAuth } from "./AuthContext";
import { LiftProvider } from "./context/LiftContext";
import App from "./App";

export default function AuthConsumerWrapper() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  if (!isLoggedIn) {
    return <App />; // login routes only
  }

  return (
    <LiftProvider>
      <App />
    </LiftProvider>
  );
}
