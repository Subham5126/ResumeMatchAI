import axios from "axios";

const api = axios.create({
    baseURL: "https://resumematchai-2g0s.onrender.com",
});

export default api;