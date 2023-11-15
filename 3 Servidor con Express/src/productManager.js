const fs = require('fs').promises;

export default class ProductManager {

  constructor(fileName) {
    this.path = fileName;
    this.products = [];
    this.lastId = 0;

    (async () => {
      try {
        const data = await fs.readFile(this.path, 'utf8');
        this.products = JSON.parse(data);
        if (this.products.length > 0) {
          this.lastId = Math.max(...this.products.map(product => product.id));
        }
      } catch (error) {
        console.error('Error reading or parsing the file:', error);
      }
    })();
  }



  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error('All fields are required');
    }

    if (this.products.some(p => p.code === product.code)) {
      throw new Error(`The code ${product.code} already exists`);
    }
    this.lastId++;
    const productId = this.lastId;
    product.id = productId;
    this.products.push(product);

    await this.saveProductsToFile(); // Guardar productos en el archivo
  }

  async saveProductsToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(p => p.id === productId);
    if (index === -1) {
      console.error(`Product with ID ${productId} not found`);
      return;
    }

    updatedProduct.id = productId;
    this.products[index] = updatedProduct;

    await this.saveProductsToFile(); // Actualizar el archivo
  }

  async deleteProduct(productId) {
    const index = this.products.findIndex(p => p.id === productId);
    if (index === -1) {
      console.error(`Product with ID ${productId} not found`);
      return;
    }

    this.products.splice(index, 1);

    await this.saveProductsToFile(); // Actualizar el archivo
  }
}

// Inicializar
(async () => {
  const manager = new ProductManager('./products.json');
 // await manager.initialize();


  // Agregar 10 productos
  const product1 = {
    title: 'Leche Fresca',
    name: 'Leche Entera',
    description: 'Leche fresca y nutritiva, ideal para el desayuno o para preparar tus recetas favoritas. Contenido: 1 litro.',
    price: 2.99,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};

const product2 = {
    title: 'Pan Integral',
    name: 'Pan Multigrano',
    description: 'Pan integral con granos variados, una opción saludable y deliciosa para tus comidas. Peso: 500 gramos.',
    price: 3.49,
    thumbnail: 'Sin imagen',
    code: 'def456',
    stock: 30,
};

const product3 = {
    title: 'Cereal Crujiente',
    name: 'Cereal de Avena y Miel',
    description: 'Cereal crujiente con copos de avena y miel, una opción energética para empezar tu día con vitalidad. Peso: 400 gramos.',
    price: 4.99,
    thumbnail: 'Sin imagen',
    code: 'ghi789',
    stock: 20,
};

const product4 = {
    title: 'Yogur Natural',
    name: 'Yogur Griego',
    description: 'Yogur natural y cremoso, perfecto para disfrutar solo o acompañado de frutas frescas. Envase: 200 gramos.',
    price: 1.79,
    thumbnail: 'Sin imagen',
    code: 'jkl012',
    stock: 15,
};

const product5 = {
    title: 'Manzanas Frescas',
    name: 'Manzanas Fuji',
    description: 'Manzanas frescas y jugosas, ideales para picar entre comidas o como ingrediente en tus recetas favoritas. Peso: 1 kg.',
    price: 2.49,
    thumbnail: 'Sin imagen',
    code: 'mno345',
    stock: 22,
};

const product6 = {
    title: 'Pasta Integral',
    name: 'Spaghetti de Trigo Integral',
    description: 'Pasta de trigo integral, una opción saludable y deliciosa para tus platos de pasta favoritos. Peso: 500 gramos.',
    price: 1.99,
    thumbnail: 'Sin imagen',
    code: 'pqr678',
    stock: 18,
};

const product7 = {
    title: 'Huevos Frescos',
    name: 'Huevos Orgánicos',
    description: 'Huevos frescos y orgánicos, una fuente de proteínas de alta calidad para tus comidas diarias. Cantidad: 12 unidades.',
    price: 3.99,
    thumbnail: 'Sin imagen',
    code: 'stu901',
    stock: 28,
};

const product8 = {
    title: 'Aceite de Oliva Extra Virgen',
    name: 'Aceite de Oliva Premium',
    description: 'Aceite de oliva extra virgen, prensado en frío y de calidad premium para realzar el sabor de tus platillos. Contenido: 500 ml.',
    price: 6.49,
    thumbnail: 'Sin imagen',
    code: 'vwx234',
    stock: 12,
};

const product9 = {
    title: 'Sopa Instantánea',
    name: 'Sopa de Pollo con Fideos',
    description: 'Sopa instantánea de pollo con fideos, lista para disfrutar en minutos. Perfecta para un almuerzo rápido y reconfortante. Peso: 80 gramos.',
    price: 1.29,
    thumbnail: 'Sin imagen',
    code: 'yzab567',
    stock: 24,
};

const product10 = {
    title: 'Café Molido',
    name: 'Café Arabica Premium',
    description: 'Café molido de granos Arabica, con un sabor suave y aromático. Ideal para empezar tu día con energía. Peso: 250 gramos.',
    price: 5.99,
    thumbnail: 'Sin imagen',
    code: 'cd6789',
    stock: 16,
};


  try {
    await manager.addProduct(product1);
    await manager.addProduct(product2);
    await manager.addProduct(product3);
    await manager.addProduct(product4);
    await manager.addProduct(product5);
    await manager.addProduct(product6);
    await manager.addProduct(product7);
    await manager.addProduct(product8);
    await manager.addProduct(product9);
    await manager.addProduct(product10);
  } catch (error) {
    console.error('Prueba 2: Error al agregar el producto:', error.message);
  }
 
})();
