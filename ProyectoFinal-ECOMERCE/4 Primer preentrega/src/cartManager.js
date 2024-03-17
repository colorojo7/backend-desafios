import {promises as fs } from 'fs'

export default class CartManager {
    constructor (fileName){
        this.path = fileName;
        this.carts = [];
        this.lastId = 0;
        this.initialize();
    }

    async initialize() {
        try {
          const data = await fs.readFile(this.path, 'utf8');
          this.carts = JSON.parse(data);
          if (this.carts.length > 0) {
            this.lastId = Math.max(...this.carts.map(cart => cart.id));
          }
        } catch (error) {
          console.error('Error reading or parsing the file:', error);
        }
      }

      async createCart (name = `Cart Number ${this.lastId++}`){
        this.lastId++
        const id = this.lastId
        const products = []
        
        const newCart = { id, name , products}

        this.carts.push(newCart);
        await this.saveCartsToFile(); 
        return newCart
      }

      async saveCartsToFile() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
      }

      getCarts() {
        return this.carts;
      }

     
      async addProductToCart(cartID, productID, productsList) {
        const cartIndex = this.carts.findIndex(c => c.id === cartID);
    
        if (cartIndex === -1) {
            throw new Error(`Cart with ID ${cartID} not found`);
        }
    
        const cart = this.carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.productID === productID);
    
        if (productIndex !== -1) {
            // El producto ya existe en el carrito, incremento la cantidad
            this.carts[cartIndex].products[productIndex].quantity += 1;
        } else {
            // El producto no existe en el carrito, agrego un nuevo item
            const product = productsList.find(p => p.id === productID);
    
            if (!product) {
                throw new Error(`Product with ID ${productID} not found`);
            }
    
            const newProduct = { productID, quantity: 1 };
            this.carts[cartIndex].products.push(newProduct);
        }
    
        const cartAfter = this.carts[cartIndex];
        await this.saveCartsToFile();
        return cartAfter;
    }
    
}