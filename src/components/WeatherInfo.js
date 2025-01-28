import React from "react";

const WeatherInfo = ({ weather, getBackgroundColor }) => {
  if (!weather) return null;

  return (
    <div className={`${getBackgroundColor(weather.temperature)}`}>
      <h2>Dane pogodowe</h2>
      <p>Temperatura: {weather.temperature}°C</p>
      <p>Prędkość wiatru: {weather.windspeed} km/h</p>
      <p>Kierunek wiatru: {weather.winddirection}°</p>
    </div>
  );
};

export default WeatherInfo;
