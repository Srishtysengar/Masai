import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=20.5937&longitude=78.9629&current_weather=true`
        );
        setWeather(res.data.current_weather);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeather();
  }, []);

  if (!weather) return <div>Loading Weather...</div>;

  return (
    <div className="weather-widget">
      <h3>Current Weather:</h3>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Wind Speed: {weather.windspeed} km/h</p>
    </div>
  );
}

export default React.memo(WeatherWidget);
