import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL, 
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.url += (config.url.includes("?") ? "&" : "?") + `auth=${token}`;
  }
  return config;
});

export default api;
