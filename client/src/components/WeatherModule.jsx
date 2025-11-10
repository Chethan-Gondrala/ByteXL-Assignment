import { useState, useEffect } from "react";
import { weatherAPI } from "../utils/api";
import "./WeatherModule.css";

export default function WeatherModule() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("London");
  const [inputCity, setInputCity] = useState("London");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const response = await weatherAPI.getWeather(cityName);
      setData(response.data);
      setCity(cityName);
      setLoading(false);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Could not fetch weather data.";
      setError(errorMsg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim() && inputCity !== city) {
      fetchWeather(inputCity);
    }
  };

  return (
    <div className="weather-module">
      <h2>🌤️ Weather Updates</h2>

      <form onSubmit={handleSearch} className="weather-search">
        <input
          type="text"
          placeholder="Enter city name (e.g., Delhi, Tokyo)"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          disabled={isLoading}
        />
        <button className="search-button" type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <span>Something Went Wrong...</span>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="weather-card">
          <div className="weather-header">
            <h3>
              {data.city}, {data.country}
            </h3>
            <img
              src={data.icon}
              alt={data.condition}
              className="weather-icon"
            />
          </div>

          <div className="weather-main">
            <div className="temperature">
              <span className="temp-value">{Math.round(data.temp)}</span>
              <span className="temp-unit">°C</span>
            </div>
            <p className="condition">{data.condition}</p>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">
                {Math.round(data.feelsLike)}°C
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{data.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{data.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
