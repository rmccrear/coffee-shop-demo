// routes/products.js

const Router = require('express').Router;
const router = Router();

// Get all products
router.get('/', (req, res) => {
  res.json({
    message: 'Get all products',
  });
});

// Get one product
router.get('/:id', (req, res) => {
  res.json({
    message: 'Get one product',
  });
});

// Create a product
router.post('/', (req, res) => {
  res.json({
    message: 'Create a product',
  });
});

// Update a product
router.put('/:id', (req, res) => {
  res.json({
    message: 'Update a product',
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  res.json({
    message: 'Delete a product',
  });
});

module.exports = router;