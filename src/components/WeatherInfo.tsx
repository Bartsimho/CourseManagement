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
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation_probability`
          );
          
          if (!response.ok) throw new Error('Failed to fetch weather data');
  
          const data = await response.json();

          const now = new Date();
          const currentHour = now.getHours(); // Gets current hour (0-23)
          
          const index = data.hourly.time.findIndex((time: string) => {
            return new Date(time).getHours() === currentHour;
        });
  
          // Parse returned data
          const startIndex = index !== -1 ? index : 0;
          const formattedData = data.hourly.time.slice(startIndex, startIndex + 6).map((time: string, i: number) => ({
            time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: data.hourly.temperature_2m[startIndex + i],
            windSpeed: data.hourly.wind_speed_10m[startIndex + i],
            windDirection: data.hourly.wind_direction_10m[startIndex + i],
            precipitationProbability: data.hourly.precipitation_probability[startIndex + i],
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
        <div className="bg-white p-4">
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="mt-2 space-y-4 lg:space-y-0 lg:flex lg:gap-x-8 lg:justify-between">
                    {weatherData.map((hour, index) => (
                        <div key={index} className="p-2 border-b flex flex-col lg:flex-row lg:items-center md:gap-4">
                            <div className="flex justify-between lg:flex-col lg:items-start lg:mr-4">
                                <span className="text-gray-600">{hour.time}</span>
                                <span className="text-gray-800 font-medium">{hour.temperature}°C</span>
                            </div>
                            <div className="text-sm text-gray-600 flex justify-between lg:flex-col lg:items-start">
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