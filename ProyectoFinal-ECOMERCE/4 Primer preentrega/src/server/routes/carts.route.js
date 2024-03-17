import  express  from "express";
import CartManager from "../../cartManager.js";
import { products } from "./products.route.js";

const manager = new CartManager("src/carts.json")
await manager.initialize()
const carts = manager.getCarts()




const route = express.Router()
const path = ""

route.get(path , (req, res)=>{
    res.send(carts)
})

route.get(`${path}/:cid`,(req,res)=>{
    const cartID = Number(req.params.cid)
    const cart = carts.find( c => c.id === cartID)

    cart ?
        res.json(cart.products)
     :
    res.status(400).json({error: `cart with ID ${cartID} not found`})
})


route.post(path, async (req, res)=>{
    const {name} = req.body

    try{
        await manager.createCart(name);
        res.send("Cart created succsesfully");
    }catch{
        res.send("somthing went wrong when creating the cart. Try again")
    }
})

route.post(`${path}/:cid/products/:pid`, async (req,res)=>{
    const cartID = Number(req.params.cid)
    const productID = Number(req.params.pid)

    if (cartID && productID ){
        try{
            await manager.addProductToCart(cartID, productID, products)
            res.send(`product ${productID} added to cart ${cartID}`)
        }catch (error){
            res.send(`Somthing went wrong: ${error}.`)
            
        }

    }
    

    
})

export default route