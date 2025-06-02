import axios from "axios";
import { conf } from "../conf/conf";

const axiosInstance = axios.create({
  baseURL: conf.backendUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
