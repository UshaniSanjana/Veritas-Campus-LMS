import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://veritas-campus-lms-production.up.railway.app",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
