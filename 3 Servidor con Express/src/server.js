import express from 'express';
//import products from './products.json';

const products = [
    {
        id:1,
      title: 'Leche Fresca',
      name: 'Leche Entera',
      description: 'Leche fresca y nutritiva, ideal para el desayuno o para preparar tus recetas favoritas. Contenido: 1 litro.',
      price: 2.99,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    },
    {
        id:2,
      title: 'Pan Integral',
      name: 'Pan Multigrano',
      description: 'Pan integral con granos variados, una opción saludable y deliciosa para tus comidas. Peso: 500 gramos.',
      price: 3.49,
      thumbnail: 'Sin imagen',
      code: 'def456',
      stock: 30,
    },
    {
        id:3,
      title: 'Cereal Crujiente',
      name: 'Cereal de Avena y Miel',
      description: 'Cereal crujiente con copos de avena y miel, una opción energética para empezar tu día con vitalidad. Peso: 400 gramos.',
      price: 4.99,
      thumbnail: 'Sin imagen',
      code: 'ghi789',
      stock: 20,
    },
    {
        id:4,
      title: 'Yogur Natural',
      name: 'Yogur Griego',
      description: 'Yogur natural y cremoso, perfecto para disfrutar solo o acompañado de frutas frescas. Envase: 200 gramos.',
      price: 1.79,
      thumbnail: 'Sin imagen',
      code: 'jkl012',
      stock: 15,
    },
    {
        id:5,
      title: 'Manzanas Frescas',
      name: 'Manzanas Fuji',
      description: 'Manzanas frescas y jugosas, ideales para picar entre comidas o como ingrediente en tus recetas favoritas. Peso: 1 kg.',
      price: 2.49,
      thumbnail: 'Sin imagen',
      code: 'mno345',
      stock: 22,
    },
    {
        id:6,
      title: 'Pasta Integral',
      name: 'Spaghetti de Trigo Integral',
      description: 'Pasta de trigo integral, una opción saludable y deliciosa para tus platos de pasta favoritos. Peso: 500 gramos.',
      price: 1.99,
      thumbnail: 'Sin imagen',
      code: 'pqr678',
      stock: 18,
    },
    {
        id:7,
      title: 'Huevos Frescos',
      name: 'Huevos Orgánicos',
      description: 'Huevos frescos y orgánicos, una fuente de proteínas de alta calidad para tus comidas diarias. Cantidad: 12 unidades.',
      price: 3.99,
      thumbnail: 'Sin imagen',
      code: 'stu901',
      stock: 28,
    },
    {
        id:8,
      title: 'Aceite de Oliva Extra Virgen',
      name: 'Aceite de Oliva Premium',
      description: 'Aceite de oliva extra virgen, prensado en frío y de calidad premium para realzar el sabor de tus platillos. Contenido: 500 ml.',
      price: 6.49,
      thumbnail: 'Sin imagen',
      code: 'vwx234',
      stock: 12,
    },
    {
        id:9,
      title: 'Sopa Instantánea',
      name: 'Sopa de Pollo con Fideos',
      description: 'Sopa instantánea de pollo con fideos, lista para disfrutar en minutos. Perfecta para un almuerzo rápido y reconfortante. Peso: 80 gramos.',
      price: 1.29,
      thumbnail: 'Sin imagen',
      code: 'yzab567',
      stock: 24,
    },
    {
        id:10,
      title: 'Café Molido',
      name: 'Café Arabica Premium',
      description: 'Café molido de granos Arabica, con un sabor suave y aromático. Ideal para empezar tu día con energía. Peso: 250 gramos.',
      price: 5.99,
      thumbnail: 'Sin imagen',
      code: 'cd6789',
      stock: 16,
    },
  ];

  

const app = express();
const port = 8080;

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const productsToShow = limit ? products.slice(0, limit) : products;
  res.json(productsToShow);
});

app.get('/products/:pid', (req, res) => {
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
