import {promises as fs } from 'fs'


export default class ProductManager {

  constructor(fileName) {
    this.path = fileName;
    this.products = [];
    this.lastId = 0;
    this.initialize();
  }

  async initialize() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.lastId = Math.max(...this.products.map(product => product.id));
      }
    } catch (error) {
      console.error('Error reading or parsing the file:', error);
    }
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

    await this.saveProductsToFile(); 
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

    await this.saveProductsToFile(); 
  }

  async deleteProduct(productId) {
    const index = this.products.findIndex(p => p.id === productId);
    if (index === -1) {
      console.error(`Product with ID ${productId} not found`);
      return;
    }

    this.products.splice(index, 1);

    await this.saveProductsToFile(); 
  }
}


