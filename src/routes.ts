import { Router, Request, Response } from 'express';
import { getWeatherData } from './weatherService';
import { categorizeTemperature } from './utils';
import { validateLatLon } from './validators/locationValidator';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

/**
 * Fetches weather data for a given latitude and longitude.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get('/weather', async (req: Request, res: Response) => {
  const lat = req.query.lat as string;
  const lon = req.query.lon as string;

  const errors = validateLatLon(lat, lon);

  if (errors.length > 0) {
    res.status(400).send(`Invalid input: ${errors.join(' ')}`);
    return;
  }

  try {
    const weatherData = await getWeatherData(lat, lon);
    const weatherCondition = weatherData.current.weather[0].description;
    const temperature = weatherData.current.temp;
    const temperatureCategory = categorizeTemperature(temperature);

    res.json({
      condition: weatherCondition,
      temperature: `${temperature}°C`,
      category: temperatureCategory,
      alerts:
        weatherData.alerts?.map((alert) => ({
          event: alert.event,
          description: alert.description,
        })) || [],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).send(errorMessage);
  }
});

export default router;
