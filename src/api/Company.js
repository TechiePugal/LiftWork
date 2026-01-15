import api from "./index";

export const getMyCompany = async () => {
  const res = await api.get("/company/me");
  return res.data;
};
