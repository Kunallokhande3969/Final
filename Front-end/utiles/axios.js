import axios from "axios";

// Create an Axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ,
  withCredentials: true, // Needed if backend uses cookies/sessions
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor for auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for global error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally redirect to login or clear token
      // window.location.href = "/login";
      console.error("Unauthorized! Please log in.");
    }
    return Promise.reject(error);
  }
);

export default instance;