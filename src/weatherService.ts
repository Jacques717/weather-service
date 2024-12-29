import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Define the structure of the weather data
interface WeatherData {
  current: {
    weather: { description: string }[];
    temp: number;
  };
  alerts?: { event: string; description: string }[];
}

/**
 * Fetches weather data for a given latitude and longitude.
 * @param lat - The latitude value as a string.
 * @param lon - The longitude value as a string.
 * @returns The weather data.
 * @throws An error if the weather data is not available or if the temperature data is not available.
 */
export const getWeatherData = async (
  lat: string,
  lon: string
): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(
    `https://api.openweathermap.org/data/2.5/onecall`,
    {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        exclude: 'minutely,hourly,daily',
      },
    }
  );

  const weatherData = response.data;

  // Validate the response data
  if (
    !weatherData.current ||
    !weatherData.current.weather ||
    weatherData.current.weather.length === 0
  ) {
    throw new Error('Weather data is not available');
  }

  if (weatherData.current.temp === undefined) {
    throw new Error('Temperature data is not available');
  }

  return weatherData;
};
