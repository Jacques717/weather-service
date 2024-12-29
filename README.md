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

  **Response:**

  - **Success (200):**

    ```json
    {
      "location": {
        "lat": 60,
        "lon": 60
      },
      "temperature": {
        "current": 15,
        "min": 10,
        "max": 20
      },
      "conditions": "Clear",
      "alerts": []
    }
    ```

  - **Error (400):**

    ```json
    {
      "error": "Invalid latitude or longitude."
    }
    ```

  - **Error (500):**
    ```json
    {
      "error": "Internal server error."
    }
    ```

### Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request. Common status codes include:

- **200 OK**: The request was successful.
- **400 Bad Request**: The request was invalid (e.g., missing parameters).
- **500 Internal Server Error**: An error occurred on the server.

## Testing

The project uses Jest and Supertest for testing. To run the tests, use the following command:

```bash
npm test
```

## Project Structure

```
/weather-service
├── /services
│   ├── weatherService.ts       // Weather service logic
│   ├── openWeatherService.ts   // OpenWeather service logic
│   ├── newWeatherService.ts    // NewWeather service logic
├── /validators
│   ├── locationValidator.ts    // Location validation logic
├── /src
│   ├── server.ts               // Main server logic
│   ├── routes.ts               // Routes for handling API requests
│   └── utils.ts                // Helper functions (e.g., temp classification)
├── .env                        // For storing API keys securely
├── package.json
├── README.md
├── Dockerfile                  // Docker configuration for containerization
├── tsconfig.json               // TypeScript configuration
├── .gitignore                  // Files to ignore in git
└── /tests
    ├── locationValidator.test.ts
    ├── routes.test.ts
    ├── server.test.ts
```

## Installed Packages

This project uses several npm packages to facilitate its functionality. Below is a list of the key packages and their purposes:

- **express**: A web framework for Node.js that simplifies the process of building web applications and APIs.
- **typescript**: A superset of JavaScript that adds static types, enabling better tooling and error checking.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, allowing for secure configuration management.
- **jest**: A testing framework for JavaScript that provides a simple way to write and run tests.
- **supertest**: A library for testing HTTP servers in Node.js, often used in conjunction with Jest for API testing.
- **@types/express**: Type definitions for Express, providing TypeScript support for the Express framework.
- **@types/jest**: Type definitions for Jest, enabling TypeScript support for the Jest testing framework.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
