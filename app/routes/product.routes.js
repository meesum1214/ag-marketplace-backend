module.exports = app => {
    const products = require("../controllers/product.controller")
    const router = require("express").Router();

    router.post("/addproduct", products.addProducts);
    
    app.use('/products/api', router);
}