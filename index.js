const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(bodyParser.json({urlencoded:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


// default route
app.get("/", (req, res) => {
    res.send("Climate api");
});

// routes for climate data
app.use('/api/climate-data',require('./routes/climateRoutes'));


// connecting to mongodb database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, (req, res) => {
      console.log("Server is running on port: " + port);
    });
  })
  .catch((err) => console.log(err));