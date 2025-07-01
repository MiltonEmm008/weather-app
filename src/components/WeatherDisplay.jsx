import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const getCurrDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {weatherData?.name || "Desconocido"},{" "}
          <span>{weatherData?.sys?.country || "Desconocido"}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrDate()}</span>
      </div>
      <div className="temperature">
        {weatherData?.main?.temp ? `${Math.round(weatherData.main.temp)}°C` : "Desconocido"}
      </div>
      <p className="description">
        {weatherData?.weather?.[0]?.description || "Sin descripción"}
      </p>
      <div className="weather-info">
        <div className="column">
          <div>
            <p className="wind">{weatherData?.wind?.speed ? `${weatherData.wind.speed} m/s` : "0 m/s"}</p>
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="column">
          <div>
            <p className="wind">
              {weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : "0%"}
            </p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 