const express= require("express");
const router = express.Router();

const WildFires= require("../Controller/WildfiresController");

router.route("/").get(WildFires);

module.exports= router;