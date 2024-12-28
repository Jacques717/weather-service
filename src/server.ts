import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

// Define the interface for the OpenWeather One Call API response
interface WeatherData {
  current: {
    weather: { description: string }[];
    temp: number;
  };
  alerts?: { event: string; description: string }[];
}

// Endpoint to get weather data by latitude and longitude
app.get('/weather', async (req: Request, res: Response) => {
  const lat = req.query.lat as string;
  const lon = req.query.lon as string;

  if (!lat || !lon) {
    res.status(400).send('Latitude and longitude are required.');
  }

  try {
    const response = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/onecall`,
      {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric', // Use metric units for temperature
          exclude: 'minutely,hourly,daily', // Exclude unnecessary data
        },
      }
    );

    const weatherData = response.data;
    const weatherCondition = weatherData.current.weather[0].description;
    const temperature = weatherData.current.temp;

    let temperatureCategory: string;
    if (temperature < 10) {
      temperatureCategory = 'cold';
    } else if (temperature >= 10 && temperature <= 25) {
      temperatureCategory = 'moderate';
    } else {
      temperatureCategory = 'hot';
    }

    const alerts =
      weatherData.alerts?.map((alert) => ({
        event: alert.event,
        description: alert.description,
      })) || [];

    res.json({
      condition: weatherCondition,
      temperature: `${temperature}°C`,
      category: temperatureCategory,
      alerts,
    });
  } catch (error) {
    res.status(500).send('Error fetching weather data.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
