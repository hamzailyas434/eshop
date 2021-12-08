const express = require("express");

// Import Controller
const productsController = require("../controllers/productsController");
const router = express.Router();

router
  .route("/")
  .post(productsController.createProducts)
  .get(productsController.getAllProducts);
module.exports = router;
