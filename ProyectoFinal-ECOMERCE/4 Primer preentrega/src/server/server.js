import express from 'express'
import cartsRouter from "./routes/carts.route.js" 
import productsRouter from "./routes/products.route.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded( {extended:true} ) ) 
const PORT = 8080

// Routes
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)

//app.use()
app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
})