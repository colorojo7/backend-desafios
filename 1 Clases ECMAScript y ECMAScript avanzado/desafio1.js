class ProductManager {
    constructor() {
      this.products = [];
    }
  
    generateProductId() {
      if (this.products.length === 0) {
        return 1; 
      }
      const maxId = Math.max(...this.products.map(product => product.id));
      return maxId + 1;
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        throw new Error('All fields are required');
      }
      
      if (this.products.some(p => p.code === product.code)) {
        throw new Error(`The code ${product.code} already exist`);
      }
  
      const productId = this.generateProductId();
      this.products.push({ ...product, id: productId });
    }
  
    getProductById(productId) {
      const product = this.products.find(p => p.id === productId);
      if (!product) {
        console.error(`Product with ID ${productId} not found`)
      }
      return product;
    }
  }
  

  // PRUEBAS
  const manager = new ProductManager();
  
  // Obtener productos ( vacío )
  console.log('Productos (vacio):', manager.getProducts());
  
  // Agregar un producto
  const product1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };

  const product2 = {
    title: 'Bananas',
    description: 'bananas Ecuador',
    price: 250,
    thumbnail: 'Sin imagen',
    code: 'abc124',
    stock: 30,
  };
  
  manager.addProduct(product1);
  console.log('Productos (1 producto):', manager.getProducts());
  manager.addProduct(product2);
  console.log('Productos (1 producto):', manager.getProducts());
  
  // Intentar agregar un producto sin campos obligatorios (debería arrojar un error)
  try {
    manager.addProduct({});
  } catch (error) {
    console.error('Error al agregar el producto:', error.message);
  }
  
  // Intentar agregar un producto con el mismo código (debería arrojar un error)
  try {
    manager.addProduct(product1);
  } catch (error) {
    console.error('Error al agregar el producto:', error.message);
  }
  
  // Obtener un producto por su ID
  const productId1 = 1;
  const foundProduct1 = manager.getProductById(productId1);
  console.log(`Producto encontrado por ID ${productId1}:`, foundProduct1);

  // Obtener un producto por su ID con ERROR
  const productId22 = 22;
  const foundProduct22 = manager.getProductById(productId22);
  console.log(`Producto encontrado por ID ${productId22}:`, foundProduct22);
  