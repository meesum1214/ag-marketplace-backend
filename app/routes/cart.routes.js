module.exports = app => {
    const cart = require("../controllers/cart.controller");
    const router = require("express").Router();
    
    router.post("/addtocart", cart.addToCart);
    router.get("/getcart", cart.getCart);
    router.delete("/deletecart", cart.deleteCart);
    router.put("/updatecart", cart.updateCart);

    app.use('/cart/api', router);
}