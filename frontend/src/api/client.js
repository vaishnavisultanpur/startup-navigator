import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("sn_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("sn_token");
      localStorage.removeItem("sn_user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (email, password) => client.post("/api/auth/login", { email, password }),
  register: (name, email, password) => client.post("/api/auth/register", { name, email, password }),
  me: () => client.get("/api/auth/me"),
};

export const articlesApi = {
  list: (category) => client.get("/api/articles", { params: category ? { category } : {} }),
  categories: () => client.get("/api/articles/categories"),
  get: (id) => client.get(`/api/articles/${id}`),
  create: (data) => client.post("/api/articles", data),
  update: (id, data) => client.put(`/api/articles/${id}`, data),
  remove: (id) => client.delete(`/api/articles/${id}`),
};

export const searchApi = {
  ask: (query) => client.post("/api/search", { query }),
  history: () => client.get("/api/search/history"),
};

export const dashboardApi = {
  get: () => client.get("/api/dashboard"),
};

export default client;
