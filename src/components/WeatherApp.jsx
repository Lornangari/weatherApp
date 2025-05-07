import { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city name');
      setWeatherData(null);
      return;
    }

    // const apiKey = '88d0b134d9a3428a7d72511ff9b20f57'; 
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    
    try {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {weatherData && (
        <div className="bg-white rounded-lg p-6 shadow-md text-center w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-2">{weatherData.name}</h2>
          <p className="text-xl capitalize">{weatherData.weather[0].description}</p>
          <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
