Climate Change API
This is a Node.js Express backend for managing climate data and calculating climate change.

Getting Started
Clone this repository to your local machine.

Install dependencies:

Copy code
npm install
Create a .env file in the project root and set your environment variables. You can use .env.example as a template.

Start the server:

sql
Copy code
npm start
The server will be running on http://localhost:3000.

API Endpoints
1. Save Climate Data
URL: /api/climate-data
Method: POST
Payload:
json
Copy code
{
  "climate": "hot" | "humid" | "rainy" | "cold",
  "area_code": 111,
  "temperature": 25,
  "humidity": 88,
  "chances_of_rain": 40
}
Response:
json
Copy code
{
  "success": true | false,
  "error": "If success is false, this will be set else it will be null and it's value would be the reason why the saving of data failed",
  "data": {
    "id": "any_random_unique_id"
  }
}
2. Fetch All Saved Records
URL: /api/climate-data
Method: GET
Response: An array of climate data records
3. Fetch Records of a Particular Area
URL: /api/climate-data/area/:area_code
Method: GET
Response: An array of climate data records for the specified area code
4. Fetch Records of a Particular Climate of a Particular Area
URL: /api/climate-data/area/:area_code/climate/:climate
Method: GET
Response: An array of climate data records for the specified area code and climate
5. Calculate Climate Change
URL: /api/climate-data/climate-change
Method: POST
Payload:
json
Copy code
{
  "from_climate": "hot" | "humid" | "rainy" | "cold",
  "to_climate": "hot" | "humid" | "rainy" | "cold",
  "area_code": xxx
}
Response:
json
Copy code
{
  "climateDelta": "hot -> cold",
  "temperatureDelta": -67,
  "humidityDelta": 79,
  "rainChancesDelta": 20,
  "climateChangeIndex": "(delta Temp * delta Humidity)/delta rainChances"
}
Please replace xxx with the actual area code you want to use when hitting the endpoints.

Seeding Data
To seed data for testing, you can run the seed.js script:

Copy code
node seed.js
This will insert sample data into your database.
