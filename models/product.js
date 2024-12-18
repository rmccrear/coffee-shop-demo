const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String
  },
  stock: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Example data

// {
//   "name": "Product 1",
//   "price": 100,
//   "description": "Description 1",
//   "stock": 10,
//   "image": "https://via.placeholder.com/150"
// }

// {
//   "name": "Matcha Latte",
//   "price": 10,
//   "description": "Green tea latte",
// }
