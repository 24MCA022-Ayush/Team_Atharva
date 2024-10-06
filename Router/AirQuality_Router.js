const express= require("express");
const router = express.Router();

const AirQualityData= require("../Controller/AirQualityController");

router.route("/").get(AirQualityData);

module.exports= router;