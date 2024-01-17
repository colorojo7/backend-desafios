import express, {json} from 'express';
import ProductManager from './productManager.js';

const app = express();
const port = 8080;
app.use(json())


const manager = new ProductManager ('src/products.json')
await manager.initialize()
const products = manager.getProducts()

app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const productsToShow = limit ? products.slice(0, limit) : products;
  res.json(productsToShow);
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = products.find(p => p.id === productId);

  if (!product) {
    res.status(404).json({ error: `Product with ID ${productId} not found` });
  } else {
    res.json(product);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
