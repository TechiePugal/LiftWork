import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useLift } from "../context/LiftContext";
import { useAuth } from "../AuthContext";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3062";

export default function useLiftSocket() {
  const socketRef = useRef(null);
  const { setLiftData, setConnected } = useLift();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    const token = localStorage.getItem("lift_token");
    if (!token) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token, // 🔑 JWT sent here
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Socket connected (JWT verified)");
      setConnected(true);
    });

    socket.on("lift_live_status", (data) => {
      setLiftData(data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket auth error:", err.message);
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, setLiftData, setConnected]);
}
