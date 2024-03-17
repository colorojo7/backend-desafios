import  express  from "express";
import ProductManager from "../../productManager.js";


const manager = new ProductManager("src/products.json")
await manager.initialize()
export const products = manager.getProducts()


const route = express.Router()
const path = ""

route.get(path , async (req, res)=>{
    const limit = parseInt(req.query.limit)
    const productToShow = limit ? 
        products.slice(0,limit)
        :
        products
    res.json(productToShow)
})

route.get(`${path}/:pid`,(req,res)=>{
    const productID = Number(req.params.pid)
    const product = products.find( p => p.id === productID)

    product ?
     res.json(product)
     :
     res.status(400).json({error: `product with ID ${productID} not found`})

})

route.post( path, async (req, res)=>{
    const {...data} = req.body
    
    try {
        await manager.addProduct(data);
        res.send("Product added succsesfully");
    } catch (error) {
        if (error.message.includes('All fields are required') || error.message.includes('already exists') || error.message.includes('Status') || error.message.includes('Invalid data types')  ) {
            console.error(`Error: ${error.message}`);
            res.status(400).json({ error: error.message });
        } else {
            console.error("Error", error.message);
            res.status(500).json({ error: "Somthing whent wrong when adding the product" });
        }
    }
} )

route.put(`${path}/:pid`, async (req, res)=>{
    const productID = Number(req.params.pid)
    const currentProduct = products.find( p => p.id === productID)
    const {...newData}= req.body
    const productUpdated = {...currentProduct, ...newData }
    console.log(newData,productUpdated);
    try{
        await manager.updateProduct(productID, productUpdated)
        res.send("Succesfully updated")
    }catch (error) {
        if (error.message.includes('not found') || error.message.includes('edit') || error.message.includes('Invalid data types') ) {
            console.error(`Error: ${error.message}`);
            res.status(400).json({ error: error.message });
        } else {
            console.error("Error", error.message);
            res.status(500).json({ error: "Somthing whent wrong when adding the product" });
        }
    }
})

route.delete(`${path}/:pid`, async (req, res)=>{
    const productID = Number(req.params.pid)
    try {
        await manager.deleteProduct(productID)
        res.send("Succesfully deleted")
    } catch (error) {
        console.log(error);
        res.send("Somthing went wrong", error)
    }
})


export default route