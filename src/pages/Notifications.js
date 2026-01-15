import { useLift } from "../context/LiftContext";
import "./Notifications.css";

/* =========================
   ALARM MESSAGE MAPPER
========================= */
const getLiftStatusMessage = (code) => {
  const c = parseInt(code, 10);
  switch (c) {
    case 0: return "No Error";
    case 1: return "OverLoad Error";
    case 4: return "Lift Up Over Travel";
    case 5: return "Ground Floor Door Open";
    case 6: return "1st Floor Door Open";
    case 7: return "2nd Floor Door Open";
    case 8: return "3rd Floor Door Open";
    case 9: return "EB Power Failure";
    case 10: return "Safety Curtain Disturbed";
    case 11: return "GF / 1F Sensor Failure";
    case 12: return "1F / 2F Sensor Failure";
    case 13: return "GF / 2F Sensor Failure";
    case 14: return "GF / 3F Sensor Failure";
    case 15: return "1F / 3F Sensor Failure";
    case 16: return "2F / 3F Sensor Failure";
    default: return "Unknown Error Code";
  }
};

export default function Notifications() {
  const { liftData, loading } = useLift();

  if (loading) return <div className="notify-loading">Loading…</div>;
  if (!liftData) return <div className="notify-loading">Waiting for system data…</div>;

  const isCritical =
    liftData.communicationError === "1" || liftData.d42 !== "0";

  return (
    <div className="notify-page">
      <div className="notify-wrapper">

        {/* HEADER */}
        <div className="notify-header">
          <h1>🔔 Notifications</h1>
          <button className="clear-btn" disabled>
            Clear All
          </button>
        </div>

        {/* CURRENT ALERT */}
        <div className={`current-alert ${isCritical ? "critical" : "normal"}`}>
          <div className="alert-left">
            <span className="alert-icon">
              {isCritical ? "🚨" : "✅"}
            </span>
            <div>
              <div className="alert-title">
                {isCritical ? "System Alert" : "System Normal"}
              </div>
              <div className="alert-message">
                {getLiftStatusMessage(liftData.d42)}
              </div>
            </div>
          </div>

          <span className="alert-badge">
            {isCritical ? "CRITICAL" : "NORMAL"}
          </span>
        </div>

        {/* HISTORY */}
        <h2 className="history-title">📋 Notification History</h2>

        <div className="history-empty">
          <div className="empty-icon">📭</div>
          <div className="empty-text">No notifications yet</div>
          <div className="empty-sub">
            Waiting for system updates…
          </div>
        </div>

        {/* FOOTER */}
        <div className="notify-footer">
          © 2024 Lift Monitoring System
        </div>

      </div>
    </div>
  );
}
