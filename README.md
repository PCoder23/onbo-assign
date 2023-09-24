# Climate Change API

The Climate Change API is a Node.js Express backend that allows you to manage climate data and calculate climate change based on various parameters such as temperature, humidity, and chances of rain. This README provides instructions on setting up and running the API.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
  - [1. Save Climate Data](#1-save-climate-data)
  - [2. Fetch All Saved Records](#2-fetch-all-saved-records)
  - [3. Fetch Records of a Particular Area](#3-fetch-records-of-a-particular-area)
  - [4. Fetch Records of a Particular Climate of a Particular Area](#4-fetch-records-of-a-particular-climate-of-a-particular-area)
  - [5. Calculate Climate Change](#5-calculate-climate-change)
- [Seeding Data](#seeding-data)

## Getting Started

These instructions will help you set up and run the Climate Change API on your local machine for development and testing purposes.

### Prerequisites

Before getting started, make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/climate-change-api.git
   ```

2. Install all the dependencies:
    ```shell
    npm i
    ```    

3. Create a `.env` file in the project root and set your environment variables. You can use `.env.example` as a template.

4. Start the server:
    ```shell
    npm start
    ```

    The server will be running on http://localhost:5000 or at the port you have specified in the `.env` file.


## API Endpoints
### 1. Save Climate Data
- URL: `/api/climate-data/add-data`
- Method: POST
- Payload:
    ```shell
    {
    "climate": "hot" | "humid" | "rainy" | "cold",
    "area_code": 111,
    "temperature": 25,
    "humidity": 88,
    "chances_of_rain": 40
    }
    ```
- Response:
    ```shell
    {
    "success": true | false,
    "error": "If success is false, this will be set else it will be null and it's value would be the reason why the saving of data failed",
    "data": {
        "id": "any_random_unique_id"
    }
    }
    ```

### 2. Fetch All Saved Records
- URL: `/api/climate-data`
- Method: GET
- Response: An array of climate data records

### 3. Fetch Records of a Particular Area
- URL: `/api/climate-data/area/:area_code`
- Method: GET
- Response: An array of climate data records for the specified area code

### 4. Fetch Records of a Particular Climate of a Particular Area
- URL: `/api/climate-data/area/:area_code/climate/:climate`
- Method: GET
- Response: An array of climate data records for the specified area code and climate

### 5. Calculate Climate Change
- URL: `/api/climate-data/climate-change`
- Method: POST
- Payload:
    ```shell
    {
    "from_climate": "hot" | "humid" | "rainy" | "cold",
    "to_climate": "hot" | "humid" | "rainy" | "cold",
    "area_code": xxx
    }
    ```

- Response:
    ```shell
    {
    "climateDelta": "hot -> cold",
    "temperatureDelta": -67,
    "humidityDelta": 79,
    "rainChancesDelta": 20,
    "climateChangeIndex": "(delta Temp * delta Humidity)/delta rainChances"
    }
    ```

Please replace `xxx` with the actual area code you want to use when hitting the endpoints.

### Seeding Data
To seed data for testing, you can run the `seed.js` script:

```shell
node seed.js
```

This will insert sample data into your database.
