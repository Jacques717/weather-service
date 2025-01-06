import axios from 'axios';
import { WeatherService, WeatherData } from './weatherService';
import { handleApiError } from '../utils/errorHandler';

export abstract class BaseWeatherService<T> implements WeatherService {
  constructor(protected apiKey: string) {}

  abstract transformResponse(response: T): WeatherData;
  protected abstract getApiUrl(): string;
  protected abstract getAdditionalParams(): object;

  protected async fetchWeatherData(url: string, params: object): Promise<T> {
    const response = await axios.get<T>(url, { params });
    return response.data;
  }

  async getWeatherData(lat: string, lon: string): Promise<WeatherData> {
    try {
      const data = await this.fetchWeatherData(this.getApiUrl(), {
        lat,
        lon,
        ...this.getAdditionalParams(),
      });

      return this.transformResponse(data);
    } catch (error) {
      throw handleApiError(error);
    }
  }
}
