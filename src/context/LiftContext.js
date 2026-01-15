import { createContext, useContext, useEffect, useRef, useState } from "react";
import { sendLiftCommand as sendLiftCommandApi } from "../api/Lift";
import { getMyCompany } from "../api/Company";
import io from "socket.io-client";

const LiftContext = createContext();

export function LiftProvider({ children }) {
  const [imei, setImei] = useState(null);
  const [company, setCompany] = useState(null);
  const [liftData, setLiftData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null); // ✅ keep socket instance

  /* =========================
     LOAD COMPANY ONCE
  ========================= */
  useEffect(() => {
    let mounted = true;

    async function loadCompany() {
      try {
        const res = await getMyCompany();
        if (!mounted) return;

        setCompany(res.data);
        setImei(res.data.imei);
      } catch (err) {
        console.error("❌ Failed to load company", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCompany();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================
     SOCKET CONNECTION
  ========================= */
  useEffect(() => {
    if (!imei) return;

    console.log("🚀 Creating socket…");

    const socket = io(process.env.REACT_APP_SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("lift_token"),
      },
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("lift_live_status", (data) => {
      setLiftData(data);
    });

    return () => socket.disconnect();
  }, [imei]);

  /* =========================
     SEND COMMAND
  ========================= */
  const sendLiftCommand = (command, value) => {
    if (!imei) return;

    sendLiftCommandApi({
      imei,
      command,
      value,
    });
  };

  return (
    <LiftContext.Provider
      value={{
        imei,
        company,
        liftData,
        connected,
        sendLiftCommand,
        loading,
      }}
    >
      {children}
    </LiftContext.Provider>
  );
}

export function useLift() {
  return useContext(LiftContext);
}
