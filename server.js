const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Temporary in-memory "database"
let products = [];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST create new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const newProduct = { id: uuidv4(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;

  res.json(product);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Express.js API Server is running');
});

// Log all routes
app._router?.stack?.forEach((middleware) => {
  if (middleware.route) {
    const methods = Object.keys(middleware.route.methods)
      .map(m => m.toUpperCase())
      .join(', ');
    console.log(`${methods} ${middleware.route.path}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//authentication
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'my-secret-key') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Example usage (protect POST, PUT, DELETE)
app.post('/api/products', authenticate, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  const newProduct = {
    id: Date.now().toString(),
    name,
    description,
    price,
    category,
    inStock,
  };

  // temporary in-memory array (define this above all routes)
  products.push(newProduct);

  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});


//validation
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
};

app.post('/api/products', authenticate, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  // Create new product object
  const newProduct = {
    id: Date.now().toString(),
    name,
    description,
    price,
    category,
    inStock,
  };

  // Assuming you’re storing data in-memory for now:
  products.push(newProduct);

  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});



