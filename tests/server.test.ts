import request from 'supertest';
import express, { Express } from 'express';
import router from '../src/routes';

const app: Express = express();
app.use(express.json());
app.use(router);

describe('GET /weather', () => {
  it('should return 400 if lat and lon are not provided', async () => {
    const response = await request(app).get('/weather');
    expect(response.status).toBe(400);
    expect(response.text).toContain(
      'Invalid input: Latitude must be a valid degree. Latitude must be between -90 and 90. Longitude must be a valid degree. Longitude must be between -180 and 180.'
    );
  });

  it('should return weather data for valid lat and lon', async () => {
    const response = await request(app)
      .get('/weather')
      .query({ lat: '60', lon: '60' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('condition');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('category');
    expect(response.body).toHaveProperty('alerts');
  });
});
