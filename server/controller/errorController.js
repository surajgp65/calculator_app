const AppError = require("../middleware/appError");

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let logError;
  logError = {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
  };
  if (req.user) {
    logError = {
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
      email: req.user.email,
      url: req.originalUrl,
    };
  }
  sendErrorDev(err, res);
};
