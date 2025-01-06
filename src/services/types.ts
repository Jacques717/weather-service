export interface OpenWeatherResponse {
  current: {
    weather: { description: string }[];
    temp: number;
  };
  alerts?: { event: string; description: string }[];
}

// Define the OpenWeather API response type
export interface NewWeatherResponse {
  cond: string;
  temp: number;
  cat: string;
  alerts?: { event: string; description: string }[];
}
