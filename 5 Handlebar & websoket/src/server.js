import express from 'express'
import {engine} from "express-handlebars"

import homeRouter from "./routes/home.router.js"
import realTimeRouter from "./routes/realTimeProduct.js"
import productRouter from "./routes/product.router.js"


import { Server } from 'socket.io'
import { products, productsManager } from './lib/productManager.js'



const app = express()
const PORT = 8080

//Middlewords
app.use(express.json())
app.use(express.urlencoded( {extended:true} ) ) 
app.use(express.static("./src/public"))

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// Routes
app.get("/", (req, res)=>{
    res.render("index")
})


app.use("/home", homeRouter)
app.use("/realtimeproducts", realTimeRouter)
app.use("/product", productRouter)



//Listen
const httmServer = app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
})

//websocket
const io =  new Server(httmServer)

io.on("connection", (socket) => {
    console.log("Un cleinte se conecto");

    socket.emit("products", products)

    socket.on("deleteProduct", (id)=>{productsManager.deleteProduct(parseInt(id))})

    socket.on("addProduct", (data)=>{productsManager.addProduct(data);})
})