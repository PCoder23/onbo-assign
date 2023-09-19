
// need to implement these functions getClimateData,addClimateData,getClimateDataByArea,getClimateDataByAreaAndClimate,getClimateChange}

const Climate = require('../models/climateModel');


// function to add climate data
exports.addClimateData = async (req, res) => {
    const {climate,area_code,temperature,humidity,chances_of_rain} = req.body;
    console.log(req.body);
    // check if climate is valid,i.e., hot,humid,rainy,cold
    if(climate!== "hot" && climate!== "humid" && climate!== "rainy" && climate!== "cold") {
        return res.status(400).json({ success: false, error: "Invalid climate type",data:null });
    }

    // check if area_code is valid,i.e., 0-999
    if (area_code < 0 || area_code > 999) {
        return res.status(400).json({ success: false, error: "Invalid area code",data:null });
    }

    // creating a new climate object
    const newClimate = new Climate({climate,temperature,humidity,area_code,chances_of_rain});
    
    try {
        // saving the new climate object
        await newClimate.save();
        res.status(201).json({ success: true, data: { id: newClimate._id },error:null });
    } catch (error) {
        // if saving fails
        res.status(409).json({ success: false, error: error.message,data:null });
    }
}

// function to get all climate data
exports.getClimateData = async (req, res) => {
    try {
        const climateData = await Climate.find();
        res.status(200).json({ success: true, data: climateData });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message,data:null,error:null});
    }
}

// function to get climate data by area code
exports.getClimateDataByArea = async (req, res) => {
    // getting the area code from the request parameters
    const {area} = req.params;


    try {
        // fetching all the data from climate database from the given area code
        const climateData = await Climate.find({ area_code: area });
        res.status(200).json({ success: true, data: climateData ,error:null});
    } catch (error) {

        // if fetching fails
        res.status(404).json({ success:false,error: error.message ,data:null});
    }
}

// function to get climate data by area code and climate type
exports.getClimateDataByAreaAndClimate = async (req, res) => {
    // getting the area code and climate type from the request parameters
    const area = req.params.area;
    const climate = req.params.climate;
    try {

        // fetching all the data from climate database from the given area code and climate type
        const climateData = await Climate.find({ area_code: area, climate: climate });
        res.status(200).json({ success: true, data: climateData,error:null });
    } catch (error) {

        // if fetching fails
        res.status(404).json({ success:false,error: error.message,data:null });
    }
}

// function to get climate change data
exports.getClimateChange = async (req, res) => {
    try {
        const {from_climate,to_climate,area_code} = req.body;
        const fromClimateData = await Climate.find({ area_code: area_code, climate: from_climate });
        const toClimateData = await Climate.find({ area_code: area_code, climate: to_climate });


        // num of data from climate type from_climate
        const numFromClimate = fromClimateData.length;

        // num of data from climate type to_climate
        const numToClimate = toClimateData.length;

        // calculating the temperature delta
        // temperature_delta -> average difference of temperatures between from and to i.e. 
        // (Sum of Temperatures at 'to' - Sum of Temperatures at 'from') / (Number of Records)
        const sumFromTemperature = fromClimateData.reduce((acc,data)=>acc+data.temperature,0);
        const sumToTemperature = toClimateData.reduce((acc,data)=>acc+data.temperature,0); 
        const temperatureDelta = (sumToTemperature - sumFromTemperature)/(numToClimate + numFromClimate);


        // calculating the humidity delta
        // Humidity_delta -> same as above for humidity
        const sumFromHumidity = fromClimateData.reduce((acc,data)=>acc+data.humidity,0);
        const sumToHumidity = toClimateData.reduce((acc,data)=>acc+data.humidity,0);
        const humidityDelta = (sumToHumidity - sumFromHumidity)/(numToClimate + numFromClimate);


        // calculating the chances of rain delta
        // rain_chances_delta-> same as above for chances_of_rain
        const sumFromChancesOfRain = fromClimateData.reduce((acc,data)=>acc+data.chances_of_rain,0);
        const sumToChancesOfRain = toClimateData.reduce((acc,data)=>acc+data.chances_of_rain,0);
        const chancesOfRainDelta = (sumToChancesOfRain - sumFromChancesOfRain)/(numToClimate + numFromClimate);


        // calculating the climate change index
        // Climate_change_index -> (temperature_delta * humidity_delta)/rain_chances_delta
        const climateChangeIndex = (temperatureDelta* humidityDelta)/chancesOfRainDelta;

        // creating the response object
        //         Response data ->
        //              {
        //              "climate_delta": "hot -> cold",
        //              "temperature_delta": -67,
        //              " humidity_delta": 79,
        //              "rain_chances_delta": 20,
        //              "climate_change_index": "(delta Temp * delta Humidity)/delta rain_chances",
        //                  }
        const climateChange = {
            climate_delta: from_climate + " -> " + to_climate,
            temperature_delta: temperatureDelta,
            humidity_delta: humidityDelta,
            rain_chances_delta: chancesOfRainDelta,
            climate_change_index: climateChangeIndex
        }

        res.status(200).json({success:true,error:null,data:climateChange});
    } catch (error) {
        res.status(404).json({ success:false,error: error.message,data:null });
    }
}


