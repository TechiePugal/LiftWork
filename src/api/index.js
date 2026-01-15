import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("lift_token");

    // ✅ Only attach token if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR 🔥
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const currentPath = window.location.pathname;

    // 🔒 Handle ONLY real auth failures
    if (status === 401 && currentPath !== "/login") {
      console.warn("🔐 Lift token expired or invalid. Logging out.");

      // ✅ Clear auth storage
      localStorage.removeItem("lift_token");
      localStorage.removeItem("lift_user");
      localStorage.removeItem("lift_company");

      // ✅ Prevent infinite redirect loop
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
