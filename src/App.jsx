import React, { useState } from "react";
import './App.css';

const cityCoordinates = {
  Katowice: "50.2599,19.0212",
  Antarktyda: "-75.250973,-0.071389",
  Peru: "-9.189967,-75.015152",
};

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!location) return alert("Proszę wybierz miasto");

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.split(",")[0]}&longitude=${location.split(",")[1]}&current_weather=true`
      );

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych pogodowych");
      }

      const data = await response.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.error("Nie udało się pobrać danych pogodowych:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherBackgroundImage = (temperature) => {
    if (temperature < 0) {
      return '/images/cold.jpg';  // Obrazek na zimno
    }
    if (temperature >= 0 && temperature <= 20) {
      return '/images/mild.jpg';  // Obrazek na umiarkowaną pogodę
    }
    return '/images/hot.jpg';  // Obrazek na gorąco
  };
  const getBackgroundColor = (temperature) => {
    if (temperature < 0) return "weather-card-blue-background";
    if (temperature >= 0 && temperature <= 20) return "weather-card-green-background";
    return "weather-card-red-background";
  };

  return (
    <div className="container">
      {weather ? (
        <div
          className="background-image"
          style={{ backgroundImage: `url(${getWeatherBackgroundImage(weather.temperature)})` }}
        ></div>
      ) : (
        <div className="background-image-gradient"></div>
      )}
      <h1 className="title">Pogodynka</h1>
      <div className="select-container">
        <select
          className="select"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Wybierz miasto</option>
          {Object.entries(cityCoordinates).map(([city, coords]) => (
            <option key={city} value={coords}>
              {city}
            </option>
          ))}
        </select>
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="button"
        >
          {loading ? "Ładowanie..." : "Sprawdź pogodę"}
        </button>
      </div>
      {weather && (
        <div className={`${getBackgroundColor(weather.temperature)}`}>
          <h2>Informacje o pogodzie</h2>
          <p>Temperatura: {weather.temperature}°C</p>
          <p>Szybkość wiatru: {weather.windspeed} km/h</p>
          <p>Kierunek wiatru: {weather.winddirection}°</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
