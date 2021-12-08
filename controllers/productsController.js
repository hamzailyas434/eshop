const Product = require("../models/productsModel");

exports.createProducts = async (req, res) => {
  try {
    const newProducts = await Product.create(req.body);
    console.log(newProducts);
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
    const productList = await Product.find();
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
