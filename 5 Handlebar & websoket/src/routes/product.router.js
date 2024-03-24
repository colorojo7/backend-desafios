import express from "express";

const route = express.Router();
const path= ""
const pageTitle= "Product"

route.get(path , async (req, res)=>{
    res.render("product")
})

export default route