const express= require("express");
const router = express.Router();

const EarthQuake= require("../Controller/EarthquakeController");

router.route("/").get(EarthQuake);

module.exports= router;