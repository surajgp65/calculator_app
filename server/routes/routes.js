const express = require("express");
const router = express.Router({ mergeParams: true });

const calculateRouter = require("./calculate");

router.use("/calculate", calculateRouter);

module.exports = router;
