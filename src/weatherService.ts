import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

interface WeatherData {
  current: {
    weather: { description: string }[];
    temp: number;
  };
  alerts?: { event: string; description: string }[];
}

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
  return response.data;
};
