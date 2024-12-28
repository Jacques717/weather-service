import { Router, Request, Response } from 'express';
import { getWeatherData } from './weatherService';
import { categorizeTemperature } from './utils';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

router.get('/weather', async (req: Request, res: Response) => {
  const lat = req.query.lat as string;
  const lon = req.query.lon as string;

  if (!lat || !lon) {
    res.status(400).send('Latitude and longitude are required.');
  }

  try {
    const weatherData = await getWeatherData(lat, lon);
    const weatherCondition = weatherData.current.weather[0].description;
    const temperature = weatherData.current.temp;
    const temperatureCategory = categorizeTemperature(temperature);

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
    //res.status(500).send('Error fetching weather data.');
    res.status(500).send(error);
  }
});

export default router;
