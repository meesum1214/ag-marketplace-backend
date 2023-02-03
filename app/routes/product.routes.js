module.exports = app => {
    const upload = require('../middlewares/productImage.middleware');

    const products = require("../controllers/product.controller")
    const router = require("express").Router();
    router.post("/addproduct",upload.single('productImage'), products.addProducts);
    router.post("/review", products.addReview);




    app.use('/products/api', router);
}