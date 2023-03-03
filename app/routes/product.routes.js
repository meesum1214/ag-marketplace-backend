module.exports = app => {
    const upload = require('../middlewares/productImage.middleware');
    const products = require("../controllers/product.controller")
    const router = require("express").Router();
    // const { authJwt } = require("../middlewares");
    // app.use([authJwt.verifyToken]);
    
    router.post("/addproduct",upload.single('productImage'), products.addProducts);
    router.post("/addreview", products.addReview);
    router.get("/getreviews", products.getReviews);

    router.get("/farmerCategories/get", products.getFarmerCategories);
    router.get("/companyCategories/get", products.getCompanyCategories);

    router.get("/getProducts", products.getProducts);

    app.use('/products/api', router);
}