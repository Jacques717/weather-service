import request from 'supertest';
import express, { Express } from 'express';
import router from '../src/routes';

const app: Express = express();
app.use(express.json());
app.use(router);

describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});

describe('GET /weather', () => {
  it('should return 400 if lat and lon are not provided', async () => {
    const response = await request(app).get('/weather');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Latitude and longitude are required.');
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
