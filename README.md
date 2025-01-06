# Weather Service

This project is a weather service API built with Node.js, Express, and TypeScript. It fetches weather data from weather service providers and provides endpoints to retrieve weather information based on latitude and longitude coordinates.

## Features

- Fetch current weather conditions, temperature, and alerts for a given location
- Generic validation system for input parameters
- Modular architecture supporting multiple weather service providers
- Abstract base service class with generic type support
- Comprehensive error handling with custom error types

## Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-service.git
   cd weather-service
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your API keys:

   ```plaintext
   OPENWEATHER_API_KEY=your_openweather_api_key
   NEWWEATHER_API_KEY=your_newweather_api_key
   ```

4. **Build the project:**

   ```bash
   npm run build
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## Usage

### Endpoints

#### GET /

Returns a welcome message to the Weather Service API.

#### GET /weather

Fetches weather data for a given latitude and longitude.

**Query Parameters:**

- `lat` (required): Latitude (-90 to 90)
- `lon` (required): Longitude (-180 to 180)

**Example Request:**

```bash
curl -G "http://localhost:3000/weather" \
     --data-urlencode "lat=60" \
     --data-urlencode "lon=60"
```

**Success Response (200):**

```json
{
  "condition": "clear sky",
  "temperature": 20,
  "category": "moderate",
  "alerts": []
}
```

**Error Response (400):**

```json
{
  "error": "Invalid input: Latitude must be between -90 and 90."
}
```

## Project Structure

```
/src
├── /services
│   ├── baseWeatherService.ts    # Abstract base class for weather services
│   ├── openWeatherService.ts    # OpenWeather implementation
│   ├── newWeatherService.ts     # Alternative weather service implementation
│   ├── weatherService.ts        # Weather service interface
│   └── types.ts                 # Service-specific type definitions
├── /utils
│   ├── errorHandler.ts          # Generic error handling utilities
│   └── temperature.ts           # Temperature categorization logic
├── /validators
│   └── validator.ts             # Generic validation system
├── routes.ts                    # API route definitions
└── server.ts                    # Express server setup
```

## Key Components

### Services

- **BaseWeatherService**: Abstract generic base class for weather services
- **OpenWeatherService**: Implementation for OpenWeather API
- **NewWeatherService**: Template for additional weather service providers

### Validation

- Generic `Validator` class supporting custom validation rules
- Separate validation rules for latitude and longitude
- Extensible validation system for adding new rules

### Error Handling

- Generic `ApiError` class with type support
- Centralized error handling utilities
- Consistent error response format

## Testing

The project uses Jest and Supertest for testing. Run tests with:

```bash
npm test
```

Test files cover:

- Input validation
- API endpoints
- Weather service implementations
- Error handling

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
