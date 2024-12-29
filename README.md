# Weather Service

This project is a weather service API built with Node.js, Express, and TypeScript. It fetches weather data from the OpenWeather API and provides endpoints to retrieve weather information based on latitude and longitude.

## Features

- Fetch current weather conditions, temperature, and alerts for a given location.
- Validate latitude and longitude inputs.
- Modular architecture with support for multiple weather service providers.

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

   Create a `.env` file in the root directory and add your OpenWeather API key:

   ```plaintext
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. **Build the project:**

   Compile the TypeScript code to JavaScript:

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

- **GET /**

  Returns a simple "Hello World" message.

- **GET /weather**

  Fetches weather data for a given latitude and longitude.

  **Query Parameters:**

  - `lat` (required): Latitude of the location.
  - `lon` (required): Longitude of the location.

  **Example:**

  ```bash
  curl -G "http://localhost:3000/weather" --data-urlencode "lat=60" --data-urlencode "lon=60"
  ```

## Testing

The project uses Jest and Supertest for testing. To run the tests, use the following command:

```bash
npm test
```

## Project Structure

/weather-service
├── /validators
│ ├── locationValidator.ts // Location validation logic
├── /src
│ ├── server.ts // Main server logic
│ ├── routes.ts // Routes for handling API requests
│ ├── weatherService.ts // Weather service logic
│ ├── openWeatherService.ts // OpenWeather service logic
│ ├── newWeatherService.ts // NewWeather service logic
│ └── utils.ts // Helper functions (e.g., temp classification)
├── .env // For storing API keys securely
├── package.json
├── README.md
├── Dockerfile // Docker configuration for containerization
├── tsconfig.json // TypeScript configuration
├── .gitignore // Files to ignore in git
└── /tests
├── locationValidator.test.ts
├── routes.test.ts
├── server.test.ts

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
