const mongoose = require("mongoose");

let calculate = new mongoose.Schema(
  {
    query: String,
  },
  { timestamps: true }
);

const Calculate = mongoose.model("Calculate", calculate);

module.exports = Calculate;
