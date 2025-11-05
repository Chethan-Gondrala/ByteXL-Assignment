import axios from "axios";

// Get the backend URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with absolute backend url
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Weather API calls
export const weatherAPI = {
  getWeather: (city = "London") =>
    API.get(`/weather?city=${encodeURIComponent(city)}`),
};

// Currency API calls
export const currencyAPI = {
  convert: (amount = 1) => API.get(`/currency?amount=${amount}`),
};

// Quote API calls
export const quoteAPI = {
  getQuote: () => API.get("/quote"),
};

export default API;
