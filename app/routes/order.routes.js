module.exports = app => {
   
    const products = require("../controllers/order.controller")
    const router = require("express").Router();
    const { authJwt } = require("../middlewares");
    app.use([authJwt.verifyToken]);
    
    router.post("/addOrder", products.addOrder);
    router.get("/getOrders", products.getOrders);

    app.use('/order/api', router);
}