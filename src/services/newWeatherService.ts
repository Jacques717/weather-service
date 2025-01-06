import { WeatherData } from './weatherService';
import { BaseWeatherService } from './baseWeatherService';
import { ApiError } from '../utils/errorHandler';
import { categorizeTemperature } from '../utils/temperature';
import { NewWeatherResponse } from './types';

export class NewWeatherService extends BaseWeatherService<NewWeatherResponse> {
  constructor() {
    super(process.env.NEWWEATHER_API_KEY || '');
  }

  protected getApiUrl(): string {
    return 'https://api.openweathermap.org/data/2.5/weather';
  }

  protected getAdditionalParams(): object {
    return {
      appid: this.apiKey,
      units: 'metric',
      type: 'current',
    };
  }

  transformResponse(response: NewWeatherResponse): WeatherData {
    if (!response.cond) {
      throw new ApiError('Weather data is not available', 500);
    }

    return {
      condition: response.cond,
      temperature: response.temp,
      category: categorizeTemperature(response.temp),
      alerts:
        response.alerts?.map((alert) => ({
          event: alert.event,
          description: alert.description,
        })) || [],
    };
  }
}
