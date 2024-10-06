const express= require("express");
const router = express.Router();

const GlobalWarming= require("../Controller/GlobalWarmingController");

router.route("/").get(GlobalWarming);

module.exports= router;