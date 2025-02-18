import React, { useState, useEffect } from 'react';

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState<{ time: string; temperature: number; windSpeed: number; windDirection: number; precipitationProbability: number;}[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your actual API key
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation_probability`
          );
          
          if (!response.ok) throw new Error('Failed to fetch weather data');
  
          const data = await response.json();
  
          // Format data (assuming API returns an array of hourly temperatures)
          const formattedData = data.hourly.time.slice(0, 6).map((time: string, index: number) => ({
            time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: data.hourly.temperature_2m[index],
            windSpeed: data.hourly.wind_speed_10m[index],
            windDirection: data.hourly.wind_direction_10m[index],
            precipitationProbability: data.hourly.precipitation_probability[index],
          }));
      
          setWeatherData(formattedData);
        } catch (err) {
          setError('Could not load weather data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchWeather();
    }, [latitude, longitude]);
  
    return (
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Next 5 Hours</h3>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="mt-2 space-y-2">
              {weatherData.map((hour, index) => (
                <div key={index} className="p-2 border-b flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{hour.time}</span>
                    <span className="text-gray-800 font-medium">{hour.temperature}°C</span>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>Wind Speed {hour.windSpeed} km/h</span>
                    <span>Wind Heading {hour.windDirection}°</span>
                    <span className="inline-block text-xl" style={{ transform: `rotate(${hour.windDirection}deg)` }}>⬆️</span>
                    <span>🌧 {hour.precipitationProbability}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    );
  };
  
  export default WeatherInfo;