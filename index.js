// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const auth = require('./middleware/auth');
const meow = require('./middleware/meow');

require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// app.use(meow);

// app.use('/api/v1/products', productRoutes);
// app.use('/products', meow, productRoutes);
// app.use('/api/v2/products', auth, productRoutes);
// app.use('/products', auth, productRoutes);
app.get("/", (req, res) => { 
  res.json({
    message: "Products API 🚀",
  });
});

app.use('/products', productRoutes);
app.use('/auth', authRoutes);


const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
};
app.use(errorHandler);

const MONGO_DB_URI = process.env.MONGO_DB_URI;
console.log('MONGO_DB_URI:', MONGO_DB_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
