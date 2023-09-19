// Import necessary modules and models
const mongoose = require('mongoose');
const Climate = require('./models/climateModel'); // Import your Climate model
const dotenv = require('dotenv');
dotenv.config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data for seeding
const sampleData = [
    // add or change data as per your need
    {
        climate: 'hot',
        area_code: 111,
        temperature: 30,
        humidity: 80,
        chances_of_rain: 10,
    },
    {
        climate: 'cold',
        area_code: 111,
        temperature: 5,
        humidity: 40,
        chances_of_rain: 20,
    },
    {
        climate: 'hot',
        area_code: 111,
        temperature: 28,
        humidity: 75,
        chances_of_rain: 15,
    },
    {
        climate: 'humid',
        area_code: 111,
        temperature: 32,
        humidity: 90,
        chances_of_rain: 70,
    },
    {
        climate: 'humid',
        area_code: 111,
        temperature: 25,
        humidity: 85,
        chances_of_rain: 30,
    },
    {
        climate: 'hot',
        area_code: 111,
        temperature: 32,
        humidity: 70,
        chances_of_rain: 5,
    },
  {
    climate: 'hot',
    area_code: 111,
    temperature: 30,
    humidity: 80,
    chances_of_rain: 10,
  },
  {
    climate: 'cold',
    area_code: 222,
    temperature: 5,
    humidity: 40,
    chances_of_rain: 20,
  },
  {
    climate: 'hot',
    area_code: 111,
    temperature: 30,
    humidity: 80,
    chances_of_rain: 10,
  },
  {
    climate: 'cold',
    area_code: 222,
    temperature: 5,
    humidity: 40,
    chances_of_rain: 20,
  },
  {
    climate: 'hot',
    area_code: 333,
    temperature: 28,
    humidity: 75,
    chances_of_rain: 15,
  },
  {
    climate: 'rainy',
    area_code: 444,
    temperature: 20,
    humidity: 90,
    chances_of_rain: 70,
  },
  {
    climate: 'humid',
    area_code: 555,
    temperature: 25,
    humidity: 85,
    chances_of_rain: 30,
  },
  {
    climate: 'hot',
    area_code: 666,
    temperature: 32,
    humidity: 70,
    chances_of_rain: 5,
  },
];

// Insert sample data into the Climate collection
Climate.insertMany(sampleData)
  .then(() => {
    console.log('Data seeded successfully');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
