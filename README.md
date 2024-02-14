# Node.js Express Post API

This is a Node.js Express API that processes numbers to identify prime numbers, palindrome numbers, and invalid numbers.

## Features

- Accepts a range of numbers and identifies prime numbers and palindrome numbers within that range.
- Implements error handling for invalid input numbers.
- Provides performance metrics for execution time.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/oiram123/project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project
   ```

3. Run the following command to start the application using Docker:

   ```bash
   docker-compose up
   ```

4. Open your web browser and navigate to:

   ```bash
   http://localhost:5000
   ```

## API Usage

### Example API Request

Send a POST request to http://localhost:5000/main/mainApp with the following JSON payload:

```bash
{
   "minNumber": 1,
   "maxNumber": 100,
   "feature": [2, 3, 5, 7, 11, 13, 22, 33, 101]
}
```

### Expected API Response

Upon successful processing, the server will respond with JSON data containing prime numbers, palindrome numbers, and execution time. Example response:

```bash
{
  "success": true,
  "data": [2, 3, 5, 7, 11, 13, 22, 33, 101],
  "timeOfExecution": 0.029363999998167856 //milliseconds
}
```

In case of invalid input numbers, the server will respond with a 400 status code and an error message.

This version includes clear instructions on how to run the application locally using Docker, as well as examples of valid API requests and expected responses. Adjust the URLs and ports according to your project's configuration.
