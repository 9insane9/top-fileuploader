import { registerUrl, loginUrl, logoutUrl } from "../../utilities/constants";
import axios from "axios";

const register = async (username, password) => {
  return await axios.post(registerUrl, { username, password });
};

const login = async (username, password) => {
  return await axios.post(loginUrl, { username, password });
};

const logout = async () => {
  return await axios.get(logoutUrl);
};

export { register, login, logout };
