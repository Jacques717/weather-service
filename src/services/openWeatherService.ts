import axios from 'axios';
import dotenv from 'dotenv';
import { WeatherService, WeatherData } from './weatherService';
import { categorizeTemperature } from '../utils';

dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export class OpenWeatherService implements WeatherService {
  async getWeatherData(lat: string, lon: string): Promise<WeatherData> {
    const response = await axios.get<{
      current: { weather: { description: string }[]; temp: number };
      alerts?: { event: string; description: string }[];
    }>(`https://api.openweathermap.org/data/2.5/onecall`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        exclude: 'minutely,hourly,daily',
      },
    });

    const data = response.data;
    if (
      !data.current ||
      !data.current.weather ||
      data.current.weather.length === 0
    ) {
      throw new Error('Weather data is not available');
    }

    if (data.current.temp === undefined) {
      throw new Error('Temperature data is not available');
    }

    return {
      condition: data.current.weather[0].description,
      temperature: data.current.temp,
      category: categorizeTemperature(data.current.temp),
      alerts:
        data.alerts?.map((alert) => ({
          event: alert.event,
          description: alert.description,
        })) || [],
    };
  }
}
