// Define the structure of the weather data
export interface WeatherData {
  condition: string;
  temperature: number;
  category: string;
  alerts: { event: string; description: string }[];
}

// Define the interface for a weather service
export interface WeatherService {
  getWeatherData(lat: string, lon: string): Promise<WeatherData>;
}
