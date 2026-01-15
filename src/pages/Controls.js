import { useState } from "react";
import { useLift } from "../context/LiftContext";
import "./Control.css";

import G from "../assets/images/G.png";
import GA from "../assets/images/GA.png";
import _1 from "../assets/images/1.png";
import _1A from "../assets/images/1A.png";
import _2 from "../assets/images/2.png";
import _2A from "../assets/images/2A.png";
import _3 from "../assets/images/3.png";
import _3A from "../assets/images/3A.png";

import DoorOpen from "../assets/images/Open.png";
import DoorClose from "../assets/images/Close.png";

const floorConfig = [
  { name: "G", v: "v1", d: "d44", doorV: "v8", doorD: "d52", img: G, imgA: GA },
  { name: "1", v: "v2", d: "d45", doorV: "v9", doorD: "d53", img: _1, imgA: _1A },
  { name: "2", v: "v3", d: "d46", doorV: "v10", doorD: "d54", img: _2, imgA: _2A },
  { name: "3", v: "v4", d: "d47", doorV: "v11", doorD: "d55", img: _3, imgA: _3A },
];

export default function Control() {
  const { company, liftData, sendLiftCommand, loading } = useLift();
  const [sending, setSending] = useState(false);

  if (loading || !liftData) return null;

  const floors = floorConfig.slice(0, company.no_of_floors + 1);

  const pulse = (key) => {
    if (sending) return;
    setSending(true);
    sendLiftCommand(key, 1);
    setTimeout(() => {
      sendLiftCommand(key, 0);
      setSending(false);
    }, 300);
  };

  return (
    <div className="lift-container">
      <h1 className="title">Lift Control</h1>

      {/* FLOORS */}
      <div className="floor-list">
        {floors.map((f) => {
          const active = liftData[f.d] === "1";
          const doorOpen = liftData[f.doorD] === "1";

          return (
            <div key={f.name} className="floor-row">
              <button
                className={`circle-btn floor-btn ${active ? "active" : ""}`}
                onClick={() => pulse(f.v)}
              >
                <img src={active ? f.imgA : f.img} alt={f.name} />
              </button>

              <button
                className="circle-btn door-btn"
                onClick={() => pulse(f.doorV)}
              >
                <img src={doorOpen ? DoorOpen : DoorClose} alt="door" />
              </button>
            </div>
          );
        })}
      </div>

      {/* STATUS */}
      <div className="status-panel">
        <div className="status-item">
          <div className="status-label">Floor</div>
          <div className="status-value">{liftData.d18 || "--"}</div>
        </div>

        <div className="status-item">
          <div className="status-label">Door</div>
          <div className="status-value">
            {liftData.d22 === "1" ? "Opened" : "Closed"}
          </div>
        </div>
      </div>
    </div>
  );
}
