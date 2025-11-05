import axios from "axios";

// Create axios instance with default config
const API = axios.create({
  baseURL: "/api",
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
