module.exports = app => {
    const upload = require('../middlewares/productImage.middleware');
    const products = require("../controllers/product.controller")
    const router = require("express").Router();
    // const { authJwt } = require("../middlewares");
    // app.use([authJwt.verifyToken]);

    router.post("/addFertilizerProduct", products.addFertilizerProducts);
    router.post("/addSeedProduct", products.addSeedProduct);
    router.post("/addPlantPathologyProduct", products.addPlantPathologyProduct);

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
    router.get("/getProductsByCategoryId", products.getProductsByCategoryId);

    router.get("/getProductFirstImage", products.getProductFirstImage);

    app.use('/products/api', router);
}