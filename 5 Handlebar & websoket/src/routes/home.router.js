import express from "express";
import { products } from "../lib/productManager.js";

const route = express.Router();
const path= ""
const pageTitle= "Home"

route.get(path , async (req, res)=>{
    const limit = parseInt(req.query.limit)
    const productsToShow = limit ? 
        products.slice(0,limit)
        :
        products
    res.render("home" , {pageTitle , productsToShow })
})

route.get(`${path}/:pid`,(req,res)=>{
    const productID = Number(req.params.pid)
    const product = products.find( p => p.id === productID)

    product ?
    res.json( {product, pageTitle: product.title})
     :
     res.status(400).json({error: `product with ID ${productID} not found`})

})

export default route