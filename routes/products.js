// routes/products.js

const Router = require('express').Router;
const router = Router();
// const upload = require('../middleware/upload');
const upload = require('../middleware/uploadAWS');
const Product = require('../models/product');

// Get all products
// router.get('/', async (req, res) => {
//   const category = req.query.category;
//   // const { category } = req.query; // es6 destructuring
//   // let filter = {};
//   // if(category) {
//   //   filter.category = category;
//   // }
//   const filter = category ? { category } : {};
//   try {
//     const products = await Product.find(filter);
//     res.json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// Get all products with pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      sortBy,
      sortOrder = 'asc',
    } = req.query;
    const filter = category ? { category } : {};
    const sort = sortBy ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : {};
    const products = await Product.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await Product.countDocuments(filter);
    res.json({ total, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one product
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  let tea;
  console.log(tea.flavor);
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    error.status = 404;
    error.message = 'Product not found';
    next(error);
    // res.status(500).json({ error: "Could not find product" });
  } 
});

// Create a product
router.post('/', upload, (req, res) => {
  const { name, price, description, category, stock } = req.body;
  // const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const imageUrl = req.file ? req.file.location : '';
  try {
    const product = new Product({ name, price, description, category, stock, image: imageUrl });
    product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create new product" });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  const { name, price, description, stock, image } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, description, stock, image }, { new: true });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update product" });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete product" });
  }
});

module.exports = router;