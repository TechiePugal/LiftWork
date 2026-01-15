import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdElevator, MdSettings } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./BottomNav.css";

const tabs = [
  { path: "/home", icon: AiOutlineHome },
  { path: "/control", icon: MdElevator },
  { path: "/system-control", icon: MdSettings },
  { path: "/notifications", icon: IoMdNotificationsOutline },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {tabs.map(({ path, icon: Icon }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            className={`nav-btn ${isActive ? "active" : ""}`}
            onClick={() => navigate(path)}
            aria-label={path}
          >
            <Icon className="nav-icon" />
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
