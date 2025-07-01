import React, { useEffect } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  const getWeatherIcon = (weatherId) => {
    // OpenWeatherMap codes for different conditions
    if (weatherId >= 200 && weatherId < 300) return '⚡'; // Storm
    if (weatherId >= 300 && weatherId < 400) return '🌧️'; // Light rain
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Fog
    if (weatherId === 800) return '☀️'; // Clear
    if (weatherId >= 801 && weatherId < 900) return '☁️'; // Cloudy
    return '🌤️'; // Default
  };

  const getWeatherClass = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return 'stormy';
    if (weatherId >= 300 && weatherId < 600) return 'rainy';
    if (weatherId >= 600 && weatherId < 700) return 'snowy';
    if (weatherId >= 700 && weatherId < 800) return 'cloudy';
    if (weatherId === 800) return 'sunny';
    if (weatherId >= 801 && weatherId < 900) return 'cloudy';
    return 'sunny';
  };

  const getCurrDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const weatherClass = weatherData ? getWeatherClass(weatherData.weather?.[0]?.id) : 'sunny';
  const weatherIcon = weatherData ? getWeatherIcon(weatherData.weather?.[0]?.id) : '🌤️';

  // Change body theme based on weather
  useEffect(() => {
    document.body.className = weatherClass;
    return () => {
      document.body.className = '';
    };
  }, [weatherClass]);

  if (!weatherData) return null;

  return (
    <div className="weather-container">
      <div className={`weather-card ${weatherClass}`}>
        <div className="city-info">
          <h2 className="city-name">
            {weatherData?.name || "Unknown"}
          </h2>
          <p className="city-country">
            {weatherData?.sys?.country || "Unknown"}
          </p>
        </div>

        <div className="date-info">
          <p className="current-date">{getCurrDate()}</p>
        </div>

        <div className="weather-main">
          <div className="weather-icon">
            <span style={{ fontSize: '120px' }}>{weatherIcon}</span>
          </div>
          <div className="temperature-section">
            <div className="temperature">
              {weatherData?.main?.temp ? Math.round(weatherData.main.temp) : "N/A"}
              <span className="temperature-unit">°C</span>
            </div>
          </div>
        </div>

        <p className="weather-description">
          {weatherData?.weather?.[0]?.description || "No description"}
        </p>

        <div className="weather-details">
          <div className="detail-card">
            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="detail-value">
              {weatherData?.wind?.speed ? `${weatherData.wind.speed} m/s` : "N/A"}
            </div>
            <div className="detail-label">Wind Speed</div>
          </div>

          <div className="detail-card">
            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <div className="detail-value">
              {weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : "N/A"}
            </div>
            <div className="detail-label">Humidity</div>
          </div>

          <div className="detail-card">
            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div className="detail-value">
              {weatherData?.main?.pressure ? `${weatherData.main.pressure} hPa` : "N/A"}
            </div>
            <div className="detail-label">Pressure</div>
          </div>

          <div className="detail-card">
            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div className="detail-value">
              {weatherData?.main?.feels_like ? `${Math.round(weatherData.main.feels_like)}°C` : "N/A"}
            </div>
            <div className="detail-label">Feels Like</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 