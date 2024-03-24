import  express  from "express";

const route = express.Router();
const path= ""
const pageTitle= "real Time"

route.get(path, (req, res)=>{
    res.render("realTimeProducts")
})

export default route