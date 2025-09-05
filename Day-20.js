//tsk-20 of hackathon...
import React, { useState, useEffect } from "react";

const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // <-- apna OpenWeather API key yaha daalo

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  // Get weather by city name
  const fetchWeatherByCity = async () => {
    if (!city.trim()) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
  };

  // Get weather by user location
  const fetchWeatherByLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    });
  };

  useEffect(() => {
    fetchWeatherByLocation(); // auto fetch on load
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">🌦 Weather Forecast App</h1>

      {/* Search City */}
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="border p-2 rounded"
        />
        <button
          onClick={fetchWeatherByCity}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          🔍 Search
        </button>
      </div>

      {/* Weather Card */}
      {weather && weather.main ? (
        <div className="bg-white shadow-lg rounded p-6 text-center w-80">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-gray-600">{weather.weather[0].description}</p>
          <p className="text-4xl mt-3">{weather.main.temp}°C</p>
          <p className="mt-2">💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
