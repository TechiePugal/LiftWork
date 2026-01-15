import api from "./index";

/* =========================
   LIFT CONTROL API
========================= */

/**
 * POST /api/lift/control
 * @param {Object} payload
 * @param {string|number} payload.imei
 * @param {string} payload.command   (v1, v2, v3...)
 * @param {number} payload.value     (0 or 1)
 */
export const sendLiftCommand = async (payload) => {
  if (!payload?.imei) {
    throw new Error("IMEI is required");
  }

  if (!payload?.command) {
    throw new Error("Command is required");
  }

  if (payload.value === undefined) {
    throw new Error("Command value is required");
  }

  const res = await api.post("/lift/control", payload);
  return res.data;
};
