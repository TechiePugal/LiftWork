import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useAuth } from "../AuthContext";
import "./AppLayout.css";

/* BACK ICON */
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* PROFILE ICON */
const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
  </svg>
);

/* LOGOUT ICON */
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const AppLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="app-layout">

      <header className="app-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>

        <h1 className="app-title">CROWN LIFT</h1>

        <div className="header-actions">
          <button className="icon-btn">
            <ProfileIcon />
          </button>

          <button className="icon-btn" onClick={logout}>
            <LogoutIcon />
          </button>
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default AppLayout;
