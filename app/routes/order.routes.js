module.exports = app => {
   
    const products = require("../controllers/order.controller")
    const router = require("express").Router();
    router.post("/addOrder", products.addOrder);
    router.get("/getOrders", products.getOrders);

    app.use('/order/api', router);
}