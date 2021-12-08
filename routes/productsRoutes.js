const express = require("express");

// Import Controller
const productsController = require("../controllers/productsController");
const router = express.Router();

router
  .route("/")
  .post(productsController.createProducts)
  .get(productsController.getAllProducts);
router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);
module.exports = router;
