const Disaster = require("../Model/disasterSchema");
const Timeline = require("../Model/TimelineSchema");

const timelineData = async (req, res) => {
  try {
    const timelinedata = await Timeline.find({});
    console.log("All timeline data:", timelinedata);

    res.json(timelinedata);
  } catch (error) {
    console.log("[timelinedata Controller]" + error);
  }
};

const disasterData = async (req, res) => {
  try {
    const disasterdata = await Disaster.find({});
    // console.log("All Disaster data:", disasterdata);
    res.json(disasterdata);
  } catch (error) {
    console.log("[Disaster Controller]" + error);
  }
};

module.exports = { timelineData, disasterData };
