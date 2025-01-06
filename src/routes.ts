import { Router, Request, Response } from 'express';
import { OpenWeatherService } from './services/openWeatherService';
// import { NewWeatherService } from './services/newWeatherService';
import { latitudeValidator, longitudeValidator } from './validators/validator';

const router = Router();

// Use dependency injection to decide which weather service implementation to use
const weatherService = new OpenWeatherService();
//const weatherService = new NewWeatherService();

router.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Weather Service API!');
});

/**
 * Fetches weather data for a given latitude and longitude.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get('/weather', async (req: Request, res: Response) => {
  const lat = req.query.lat as string;
  const lon = req.query.lon as string;

  const latErrors = latitudeValidator.validate(lat);
  const lonErrors = longitudeValidator.validate(lon);
  const errors = [...latErrors, ...lonErrors];

  if (errors.length > 0) {
    res.status(400).send(`Invalid input: ${errors.join(' ')}`);
    return;
  }

  try {
    const weatherData = await weatherService.getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).send(errorMessage);
  }
});

export default router;
