const fs = require('fs').promises;

class ProductManager {

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
    try{
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
      console.log('Prueba 2: Producto agregado satisfactoriamente:', product);
    }catch (error) {
      console.error('Prueba 2: Error al agregar el producto:', error.message);
    }
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
    try{
      const index = this.products.findIndex(p => p.id === productId);
      if (index === -1) {
        console.error(`Product with ID ${productId} not found`);
        return;
      }
  
      updatedProduct.id = productId;
      this.products[index] = updatedProduct;
  
      await this.saveProductsToFile(); // Actualizar el archivo
      console.log('Prueba 5: Producto actualizado correctamente (ID no cambió):', updatedProduct);

    }catch (error) {
      console.error(`Prueba 6: Error al eliminar el producto con ID ${productId1}:`, error.message);
    }
  }

  async deleteProduct(productId) {
    try{
      const index = this.products.findIndex(p => p.id === productId);
      if (index === -1) {
        console.error(`Product with ID ${productId} not found`);
        return;
      }
  
      this.products.splice(index, 1);
  
      await this.saveProductsToFile(); // Actualizar el archivo
      console.log(`Prueba 6: Producto con ID ${productId} eliminado correctamente`);

    }catch (error) {
      console.error(`Prueba 6: Error al eliminar el producto con ID ${productId1}:`, error.message);
    }
  }
}

// Ejemplo de uso
(async () => {
  const manager = new ProductManager('./products.json');
 // await manager.initialize();

  // Prueba 1: Verificar si "getProducts" devuelve un arreglo vacío al principio
  console.log('Prueba 1: Productos iniciales (debería ser un arreglo vacío):', manager.getProducts());

  // Prueba 2: Agregar un nuevo producto
  const product1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };

 
  await manager.addProduct(product1);
  

  // Prueba 3: Verificar si "getProducts" devuelve el producto recién agregado
  console.log('Prueba 3: Productos después de agregar uno:', manager.getProducts());

  // Prueba 4: Obtener un producto por ID
  const productId1 = product1.id; // ID del producto recién agregado
  const foundProduct1 = manager.getProductById(productId1);
  console.log(`Prueba 4: Producto encontrado por ID ${productId1}:`, foundProduct1);

  // Prueba 5: Actualizar un producto sin cambiar el ID
  const updatedProduct = {
    ...product1,
    price: 300,
    stock: 30,
  };

 
  await manager.updateProduct(productId1, updatedProduct);
 

  // Prueba 6: Eliminar un producto por ID

    await manager.deleteProduct(productId1);
   

  // Verificar que el producto se haya eliminado
  console.log('Productos después de eliminar uno:', manager.getProducts());
})();
