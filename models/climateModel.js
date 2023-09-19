const mongoose = require('mongoose');
// "climate":"hot" | "humid" | "rainy" | "cold",
//   "area_code": 111,
//   "temperature": 25,
//   "humidity": 88,
//   "chances_of_rain": 40


// creating a schema for climate data based on above referance
const climateSchema = mongoose.Schema({
    climate: {type: String,required: true},
    area_code: {type: Number,required: true},
    temperature: {type: Number,required: true},
    humidity: {type: Number,required: true},
    chances_of_rain:{type: Number,required: true}
})

const Climate = mongoose.model('Climate',climateSchema);

module.exports = Climate;