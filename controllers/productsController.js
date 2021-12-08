const Product = require("../models/productsModel");
const Categories = require("../models/categoriesModel");
exports.createProducts = async (req, res) => {
  try {
    const Category = await Categories.findById(req.body.category);
    // if (!Category) return res.status(404).send("Invalid Category");
    if (!Category) {
      res.status(404).json({
        status: "Fail",
        message: "Invalid ID",
      });
    }

    const newProducts = await Product.create(req.body);

    res.status(200).json({
      status: "Success",
      data: {
        newProducts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find().populate("category");
    res.status(200).json({
      status: "Success",
      results: productList.length,
      data: {
        productList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndRemove(req.params.id);
    if (deleteProduct) {
      res.status(204).json({
        status: "success",
        data: {
          deleteProduct,
          message: "Product is deleted",
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        data: {
          deleteProduct,
          message: "Product is not deleted",
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const Category = await Categories.findById(req.body.category);
    // if (!Category) return res.status(404).send("Invalid Category");
    if (!Category) {
      res.status(400).json({
        status: "fail",
        message: "Invalid Category ID",
      });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        updateProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data Not Updated!",
    });
  }
};
