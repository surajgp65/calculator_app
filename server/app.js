var express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const AppError = require("./middleware/appError");
const errorHandler = require("./controller/errorController");

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const routes = require("./routes/routes");

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json());

dotenv.config({ path: "./conf.env" });
const DB = process.env.mongodb;
const port = process.env.PORT || 8000;

//** mongoose Connection */
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
//**Connection End */

app.use("", routes);
app.all("*", (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(errorHandler);

app.listen(port, () => {
  console.warn("Running on port --->", port);
  console.warn("Database is connected !!!");
}); //**Running on PORT */
