const {Router} = require('express');

const {getClimateData,addClimateData,getClimateDataByArea,getClimateDataByAreaAndClimate,getClimateChange} = require('../controllers/climateController');

const router = Router();

// routes

// endpoint  "/api/climate-data" to get all climate data
router.get('/',getClimateData);

// endpoint  "/api/climate-data" to add climate data
router.post('/add-data',addClimateData);

// endpoint  "/api/climate-data/area/:area" to get climate data by area code
router.get('/area/:area',getClimateDataByArea);

// endpoint  "/api/climate-data/area/:area/climate/:climate" to get climate data by area code and climate type
router.get('/area/:area/climate/:climate',getClimateDataByAreaAndClimate);

// endpoint  "/api/climate-data/climate-change" to get climate change data
router.post('/climate-change',getClimateChange);

module.exports = router;