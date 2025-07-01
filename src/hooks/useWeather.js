import { useState, useCallback } from 'react';

const API_KEY = '4f860d8b0e124729e392251515a64493';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = useCallback(async (city) => {
    if (!city || city.trim() === "") {
      setError("Please enter a valid city");
      return null;
    }

    setLoading(true);
    setWeatherData(null);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data && response.ok) {
        setWeatherData(data);
        return data;
      } else {
        const errorMessage = `City not found: ${city}`;
        setError(errorMessage);
        return null;
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      const errorMessage = "Error getting weather data";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, long) => {
    setLoading(true);
    setWeatherData(null);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data && response.ok) {
        setWeatherData(data);
        return data;
      } else {
        const errorMessage = `Error: ${data.message || 'Could not get weather'}`;
        setError(errorMessage);
        return null;
      }
    } catch (err) {
      console.error("Error fetching weather by coords:", err);
      const errorMessage = "Error getting weather data";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setWeatherData(null);
    setError(null);
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearWeather
  };
}; 