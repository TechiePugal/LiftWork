import api from "./index";

export const loginApi = async (username, password) => {
  const res = await api.post("/auth/login", {
    username,
    password,
  });
  return res.data;
};
