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
    expect(response.text).toContain('Invalid input');
  });

  it('should return 400 for invalid latitude', async () => {
    const response = await request(app)
      .get('/weather')
      .query({ lat: 'invalid', lon: '0' });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Latitude must be a valid degree.');
  });

  it('should return 400 for invalid longitude', async () => {
    const response = await request(app)
      .get('/weather')
      .query({ lat: '0', lon: 'invalid' });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Longitude must be a valid degree.');
  });

  it('should return 200 and weather data for valid lat and lon', async () => {
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
