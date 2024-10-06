const express= require("express");
const router = express.Router();

const timeLineData = require("../Controller/TimelineDataController");

router.route("/").get(timeLineData.timelineData);
router.route("/disaster").get(timeLineData.disasterData);

module.exports= router;