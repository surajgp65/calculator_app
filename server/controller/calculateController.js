var express = require("express");
const app = express();
const mongoose = require("mongoose");
const AppError = require("../middleware/appError");
const catchAsync = require("../middleware/catchAsync");

const Calculate = require("../models/calculateModel");

exports.getCalulation = catchAsync(async (req, res, next) => {
  const calculation = await Calculate.find();

  if (!calculation) {
    return next(new AppError(`Not able to retrive data`, 409));
  }

  res.status(200).json({
    status: "Success",
    calculation,
  });
});

exports.createCalculation = catchAsync(async (req, res, next) => {
  const calculation = await Calculate.create(req.body);
  if (!calculation) {
    return next(new AppError(`Not able to create data`, 400));
  }

  res.status(200).json({
    status: "Success",
    calculation,
  });
});

exports.deleteAll = catchAsync(async (req, res, next) => {
  const calculation = await Calculate.deleteMany();

  res.status(200).json({
    status: "Success",
    calculation,
  });
});
