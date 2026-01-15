import { useAuth } from "../AuthContext";
import { useLift } from "../context/LiftContext";
import { useEffect, useState } from "react";
import CELOGO from "../assets/images/OGlift.jpg";

export default function Home() {
  const { user } = useAuth();
  const { liftData, connected, loading } = useLift();

  const [connectionState, setConnectionState] = useState("connecting");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* -------------------- RESPONSIVE -------------------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (connected) {
      setConnectionState("connected");
    } else {
      const t = setTimeout(() => {
        setConnectionState("disconnected");
      }, 800);
      return () => clearTimeout(t);
    }
  }, [connected]);

  const getLiftPositionText = () => {
    if (!liftData) return "—";
    if (liftData.d48 === "1") return "G";
    if (liftData.d49 === "1") return "1";
    if (liftData.d50 === "1") return "2";
    if (liftData.d51 === "1") return "3";
    return "N/A";
  };

  const getConnectionColor = () => {
    if (connectionState === "connecting") return "#facc15";
    if (connectionState === "connected") return "#22c55e";
    return "#ef4444";
  };

  const styles = getStyles(isMobile);

  /* -------------------- LOADING -------------------- */
  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner} />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  /* -------------------- MAIN -------------------- */
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <h1 style={styles.welcome}>Welcome</h1>
          <p style={styles.username}>{user?.name || "User"}</p>
        </div>

        <div style={styles.imageWrapper}>
          <img src={CELOGO} alt="Lift" style={styles.image} />
        </div>

        <p style={styles.label}>Your Lift At</p>
        <div style={styles.floor}>{getLiftPositionText()}</div>

        <p style={{ ...styles.connection, color: getConnectionColor() }}>
          {connectionState === "connecting"
            ? "Connecting…"
            : connectionState === "connected"
            ? "Live Connected"
            : "Disconnected"}
        </p>

      </div>
    </div>
  );
}

/* -------------------- STYLES -------------------- */
const getStyles = (isMobile) => ({
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: isMobile ? "28px 20px" : "16px",
  },

  card: {
    width: "100%",
    maxWidth: 440,
    borderRadius: isMobile ? 32 : 24,
    padding: isMobile ? "40px 28px" : "28px 20px",
    textAlign: "center",
  },

  header: {
    marginBottom: isMobile ? 28 : 18,
  },

  welcome: {
    fontSize: isMobile ? "32px" : "24px",
    margin: 0,
    color: "white",
  },

  username: {
    fontSize: isMobile ? "44px" : "34px",
    fontWeight: 800,
    color: "#facc15",
    marginTop: 12,
  },

  imageWrapper: {
    maxWidth: isMobile ? 340 : 300,
    margin: isMobile ? "36px auto" : "24px auto",
  },

  image: {
    width: "100%",
    borderRadius: 22,
  },

  label: {
    fontSize: isMobile ? "24px" : "20px",
    marginTop: isMobile ? 22 : 16,
    color: "#fde68a",
  },

  floor: {
    fontSize: isMobile ? "96px" : "80px",
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },

  connection: {
    marginTop: isMobile ? 22 : 14,
    fontSize: isMobile ? "20px" : "17px",
    fontWeight: 500,
  },

  loadingWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingCard: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: isMobile ? "28px 36px" : "20px 28px",
    borderRadius: 16,
    color: "#facc15",
    fontSize: isMobile ? "20px" : "18px",
  },

  spinner: {
    width: isMobile ? 30 : 24,
    height: isMobile ? 30 : 24,
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: "#facc15",
    animation: "spin 1s linear infinite",
  },
});
