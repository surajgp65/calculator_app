var express = require("express");
var router = express.Router();

const Calculate = require("../controller/calculateController");

router.get("/", Calculate.getCalulation);
router.post("/create", Calculate.createCalculation);
router.delete("/deleteAll", Calculate.deleteAll);

module.exports = router;
