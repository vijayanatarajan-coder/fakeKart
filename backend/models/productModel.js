const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed hundred characters"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter the required description"],
  },
  rating: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select correct category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Cloths/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoors",
        "Home",
      ],
      message: "please select correct category",
    },
  },
  seller: {
    type: String,
    require: [true, "Please enter the product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
    maxLength: [20, "product stock cannot exceed 20"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("product", productSchema);

module.exports = schema;
