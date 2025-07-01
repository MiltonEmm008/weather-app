import React, { useEffect, useState } from "react";
import Search from "./Search/Search";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";
import LocationButton from "./LocationButton/LocationButton";
import { ErrorMessage, LoadingMessage } from "./StatusMessages/StatusMessages";
import { useGeolocation } from "../hooks/useGeolocation";
import { useWeather } from "../hooks/useWeather";
import "../styles/base.css";

function Weather() {
  const [search, setSearch] = useState("");
  const { loading: locationLoading, error: locationError, getCurrentLocation } = useGeolocation();
  const { weatherData, loading: weatherLoading, error: weatherError, fetchWeatherByCity, fetchWeatherByCoords } = useWeather();

  const handleSearch = async () => {
    if (search.trim() === "") {
      return;
    }
    await fetchWeatherByCity(search);
  };

  const handleLocationRequest = async () => {
    const coords = await getCurrentLocation();
    if (coords) {
      await fetchWeatherByCoords(coords.latitude, coords.longitude);
    }
  };

  // Load default city only if no data
  useEffect(() => {
    if (!weatherData && !weatherLoading && !weatherError) {
      fetchWeatherByCity("New York");
    }
  }, [weatherData, weatherLoading, weatherError, fetchWeatherByCity]);

  const isLoading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  return (
    <div className="App">
      <Search
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      
      <LocationButton
        onClick={handleLocationRequest}
        loading={locationLoading}
        disabled={false}
      />
      
      {error && <ErrorMessage message={error} />}
      
      {isLoading ? (
        <LoadingMessage message="Getting weather information..." />
      ) : (
        <WeatherDisplay weatherData={weatherData} />
      )}
    </div>
  );
}

export default Weather;
