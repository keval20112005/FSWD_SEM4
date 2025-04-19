import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "bca2f050f9e4da5a08d979fcb04c022c"; // Replace with your key

const WeatherApp = () => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("City not found. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather on component mount & when city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements.city.value.trim();
    if (inputCity) {
      setCity(inputCity);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>🌦 Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
