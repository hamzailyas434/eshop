const express = require("express");
const app = express();
const dotenv = require("dotenv/config");
const api = process.env.API_URL;
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const productsRoute = require("./routes/productsRoutes");
const categoriesRoute = require("./routes/categoriesRoute");

// Enable cors
app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
// app.use(morgan("tiny"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROutes
app.use(`${api}/products`, productsRoute);
app.use(`${api}/categories`, categoriesRoute);
// Global Error Handling  Original: 127.0.0.1:3000/api/v1/donors Error: 127.0.0.1:3000/api/v1/donorx
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "Fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});
//  Error Handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Mongo DB Connection
const DB = process.env.DATABASE_MONGODB;
mongoose.connect(DB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
  }
});
// Server
app.listen(3000, () => {
  console.log(api);
  console.log(`Server is running http://localhost:3000`);
});
