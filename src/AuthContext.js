import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     RESTORE LOGIN ON REFRESH
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("lift_token");
    const userData = localStorage.getItem("lift_user");
    const companyData = localStorage.getItem("lift_company");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setCompany(companyData ? JSON.parse(companyData) : null);
      setIsLoggedIn(true);
    }

    setLoading(false);
  }, []);

  /* =========================
     LOGIN
  ========================= */
  const login = ({ token, user, company }) => {
    localStorage.setItem("lift_token", token);
    localStorage.setItem("lift_user", JSON.stringify(user));
    if (company) {
      localStorage.setItem("lift_company", JSON.stringify(company));
    }

    setUser(user);
    setCompany(company);
    setIsLoggedIn(true);
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCompany(null);
    setIsLoggedIn(false);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, company, isLoggedIn, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
