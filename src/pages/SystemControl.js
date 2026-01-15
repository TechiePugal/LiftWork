import { useLift } from "../context/LiftContext";
import "./SystemControl.css";

export default function SystemControl() {
  const { liftData, sendLiftCommand, loading } = useLift();

  if (loading) return <div className="sys-loading">Loading system…</div>;
  if (!liftData) return <div className="sys-loading">Waiting for lift data…</div>;

  return (
    <div className="system-container">
      <h2 className="system-title">System Controls</h2>
      <p className="system-subtitle">Elevator management system</p>

      <SystemRow
        icon="💡🌀"
        label="Light / Fan"
        value={liftData.d6 === "1"}
        onToggle={() =>
          sendLiftCommand("v7", liftData.d6 === "1" ? 0 : 1)
        }
      />

      <SystemRow
        icon="🚧"
        label="Light Curtain Bypass"
        value={liftData.d11 === "1"}
        onToggle={() =>
          sendLiftCommand("v12", liftData.d11 === "1" ? 0 : 1)
        }
      />

      <SystemRow
        icon="🔒"
        label="Child Lock"
        value={liftData.d12 === "1"}
        onToggle={() =>
          sendLiftCommand("v13", liftData.d12 === "1" ? 0 : 1)
        }
      />
    </div>
  );
}

/* =========================
   REUSABLE ROW
========================= */
function SystemRow({ icon, label, value, onToggle }) {
  return (
    <div className="system-row">
      <div className="row-left">
        <div className="row-icon">{icon}</div>
        <div className="row-label">{label}</div>
      </div>

      <div className="row-right">
        <span className={`status-pill ${value ? "on" : "off"}`}>
          {value ? "ON" : "OFF"}
        </span>

        <button
          className={`switch ${value ? "active" : ""}`}
          onClick={onToggle}
        >
          <span className="switch-thumb" />
        </button>
      </div>
    </div>
  );
}
