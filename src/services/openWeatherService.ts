import dotenv from 'dotenv';
import { categorizeTemperature } from '../utils';
import { BaseWeatherService } from './baseWeatherService';
import { ApiError } from '../utils/errorHandler';
import { WeatherData } from './weatherService';
import { OpenWeatherResponse } from './types';
dotenv.config();

export class OpenWeatherService extends BaseWeatherService<OpenWeatherResponse> {
  constructor() {
    super(process.env.OPENWEATHER_API_KEY || '');
  }

  protected getApiUrl(): string {
    return 'https://api.openweathermap.org/data/2.5/onecall';
  }

  protected getAdditionalParams(): object {
    return {
      appid: this.apiKey,
      units: 'metric',
      exclude: 'minutely,hourly,daily',
    };
  }

  transformResponse(response: OpenWeatherResponse): WeatherData {
    if (!response.current?.weather?.[0]) {
      throw new ApiError('Weather data is not available', 500);
    }

    return {
      condition: response.current.weather[0].description,
      temperature: response.current.temp,
      category: categorizeTemperature(response.current.temp),
      alerts:
        response.alerts?.map((alert) => ({
          event: alert.event,
          description: alert.description,
        })) || [],
    };
  }
}
