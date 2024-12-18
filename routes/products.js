// routes/products.js

const Router = require('express').Router;
const router = Router();

const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not find product" });
  } 
});

// Create a product
router.post('/', (req, res) => {
  const { name, price, description, category, stock } = req.body;
  try {
    const product = new Product({ name, price, description, category, stock });
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