import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://resumematchai-2g0s.onrender.com",
});

export default api;