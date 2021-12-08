const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, `A Product must have a Name`],
  },
  description: {
    type: String,
    trim: true,
    required: [true, `A Product must have a Description`],
  },
  richDescription: {
    type: String,
    trim: true,
    default: "",
  },
  image: {
    type: String,
    trim: true,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    trim: true,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, `A Product must have a Category`],
  },
  countInStock: {
    type: Number,
    required: [true, `A Product must have a stock`],
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
