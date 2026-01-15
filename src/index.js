import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import { LiftProvider } from "./context/LiftContext";
import AuthGate from "./AuthGate";
import AuthConsumerWrapper from "./AuthConsumerWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <AuthGate>
      <AuthConsumerWrapper />
    </AuthGate>
  </AuthProvider>
);
