import api from "./api";

const API_URL = import.meta.env.VITE_BASE_URL + "/auth";

const register = async (username, password) => {
  return await api.post(API_URL + "/register", {
    username,
    password,
  });
};

const AuthService = {
  register,
};

export default AuthService;
