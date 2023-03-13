module.exports = app => {
    const upload = require('../middlewares/productImage.middleware');
    const products = require("../controllers/product.controller")
    const router = require("express").Router();
    // const { authJwt } = require("../middlewares");
    // app.use([authJwt.verifyToken]);

    router.post("/addproduct", products.addProducts);
    router.put("/updateproduct", products.updateProduct);
    router.delete("/deleteproductimages", products.deleteProductImages);
    router.put("/updateproductimages", upload.single('productImage'), products.updateProductImages);
    router.post("/addreview", products.addReview);
    router.get("/getreviews", products.getReviews);
    router.post("/addProductImage", upload.single('productImage'), products.addProductImages);

    router.put("/updateProductBidId", products.updateProductBidId)
    router.delete("/deleteBidById", products.deleteBidById)

    router.get("/farmerCategories/get", products.getFarmerCategories);
    router.get("/companyCategories/get", products.getCompanyCategories);

    router.get("/getProducts", products.getProducts);
    router.get("/getProductById", products.getProductById);

    app.use('/products/api', router);
}