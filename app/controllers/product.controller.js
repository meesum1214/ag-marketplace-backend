const db = require("../models");
const Product = db.product;
const Review = db.review;

exports.addProducts = async (req, res) => {
    const { productName, description, price, stockQuantity, biddingStatus, saleStatus, user_id, category_id, shippingAmount, subsidy } = req.body;

    try {
        const product = await Product.create({
            productName,
            description,
            price,
            stockQuantity,
            shippingAmount,
            biddingStatus,
            saleStatus: `${saleStatus}%`,
            category_id,
            user_id,
            subsidy: `${subsidy}%`,
            productStatus: 'Processing'
        });

        let myProduct = await Product.findOne({
            where: {
                id: product.id
            },
            include: [{
                model: db.category,
                attributes: ["categoryName"]
            },
            {
                model: db.user,
                attributes: ["firstName", "lastName"]
            }]
        });

        res.status(200).send({
            message: "Product added successfully",
            myProduct
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};

//========== update Product ================
exports.updateProduct = async (req, res) => {
    const { id, productName, description, price, stockQuantity, biddingStatus, saleStatus, user_id, category_id, shippingAmount, subsidy } = req.body;

    try {
        const product = await Product.update({
            productName,
            description,
            price,
            stockQuantity,
            shippingAmount,
            biddingStatus,
            saleStatus,
            category_id,
            user_id,
            subsidy: `${subsidy}%`,
            productStatus: 'Processing'
        }, {
            where: {
                id
            }
        });

        let myProduct = await Product.findOne({
            where: {
                id
            },
            include: [{
                model: db.category,
                attributes: ["categoryName"]
            },
            {
                model: db.user,
                attributes: ["firstName", "lastName"]
            }]
        });

        res.status(200).send({
            message: "Product updated successfully",
            myProduct
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};

//========== update Product Bid Id ================
exports.updateProductBidId = async (req, res) => {
    const { product_id, bid_id } = req.body;

    try {
        const product = await Product.update({
            bid_id
        }, {
            where: {
                id: product_id
            }
        });
        
        let myProduct = await Product.findOne({
            where: {
                id: product_id
            },
            include: [{
                model: db.category,
                attributes: ["categoryName"]
            },
            {
                model: db.user,
                attributes: ["firstName", "lastName"]
            }]
        });

        res.status(200).send({
            message: "Product updated successfully",
            myProduct
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};

//========== delete Bid by Bid_Id ================
exports.deleteBidById = async (req, res) => {
    const { bid_id } = req.query;
    
    try {
        await db.bid.destroy({
            where: {
                id: bid_id
            }
        });
        
        res.status(200).send({
            message: "Bid deleted successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};

//========== delete previous images by product Id ================
exports.deleteProductImages = async (req, res) => {
    const { product_id } = req.query;

    try {
        await db.productImages.destroy({
            where: {
                product_id
            }
        });

        res.status(200).send({
            message: "Product Images deleted successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};

//========== Update Product Images ================
exports.updateProductImages = async (req, res) => {
    const { filename } = req.file;
    const { product_id } = req.body;

    try {
        // await db.productImages.destroy({
        //     where: {
        //         product_id
        //     }
        // });

        await db.productImages.create({
            image: 'https://agronomics.pk/productImages/' + filename,
            product_id
        });

        let myProduct = await Product.findOne({
            where: {
                id: product_id
            },
            include: [{
                model: db.category,
                attributes: ["categoryName"]
            },
            {
                model: db.user,
                attributes: ["firstName", "lastName"]
            }]
        });

        res.status(200).send({
            message: "Product Image updated successfully",
            myProduct
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};


exports.addProductImages = async (req, res) => {
    const { filename } = req.file;
    const { product_id } = req.body;

    try {
        const productImage = await db.productImages.create({
            image: 'https://agronomics.pk/productImages/' + filename,
            product_id
        });

        // let myProduct = await Product.findOne({
        //     where: {
        //         id: product_id
        //     },
        //     include: [{
        //         model: db.category,
        //         attributes: ["categoryName"]
        //     },
        //     {
        //         model: db.user,
        //         attributes: ["firstName", "lastName"]
        //     }]
        // });

        res.status(200).send({
            message: "Product Image added successfully",
            // myProduct
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Product."
        });
    }
};

//==========addReview================
exports.addReview = async (req, res) => {
    const { review, rating, user_id, product_id } = req.body;
    try {
        const reviews = await Review.create({
            review,
            rating,
            user_id,
            product_id
        });


        res.status(200).send({
            message: "Review added successfully",
            reviews: {
                review: reviews.review,
                rating: reviews.rating,
                user_id: reviews.user_id,
                product_id: reviews.product_id
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Review."
        });
    }
}


//==========getReviews================
exports.getReviews = async (req, res) => {
    const { product_id } = req.query;
    try {
        const reviews = await Review.findAll({
            where: {
                product_id
            },
            attributes: ["id", "review", "rating", "createdAt", "updatedAt"],
            include: [{
                model: db.product,
                as: "product",
                attributes: ["productName"]
            }, {
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName"]
            }]
        });

        if (reviews.length === 0) return res.status(404).send({ message: "No reviews found for this product." });

        res.status(200).send({
            message: "Reviews fetched successfully",
            reviews
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Reviews."
        });
    }
}


//==========getFarmerCategories================
exports.getFarmerCategories = async (req, res) => {
    try {
        const categories = await db.category.findAll({
            where: {
                categoryType: "farmer"
            },
            attributes: ["id", "categoryName"]
        });

        if (categories.length === 0) return res.status(404).send({ message: "No categories found." });

        res.status(200).send({
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Categories."
        });
    }
}

//==========getCompanyCategories================
exports.getCompanyCategories = async (req, res) => {
    try {
        const categories = await db.category.findAll({
            where: {
                categoryType: "company"
            },
            attributes: ["id", "categoryName"]
        });

        if (categories.length === 0) return res.status(404).send({ message: "No categories found." });

        res.status(200).send({
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Categories."
        });
    }
}

//==========getCompanyProducts================
exports.getProducts = async (req, res) => {
    const { user_id } = req.query;
    try {
        const products = await Product.findAll({
            where: {
                user_id,
            },
            attributes: ["id", "productName", "description", "price", "stockQuantity", "shippingAmount", "biddingStatus", "saleStatus", "productStatus"],
            include: [{
                model: db.category,
                as: "category",
                attributes: ["categoryName"]
            }, {
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName"]
            }, {
                model: db.productImages,
                as: "product_images",
                attributes: ["image"]
            }]
        });

        if (products.length === 0) return res.status(404).send({ message: "No products found for this category." });

        res.status(200).send({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Products."
        });
    }
}


//========== getProductById ================
exports.getProductById = async (req, res) => {
    const { id } = req.query;

    try {
        const products = await Product.findOne({
            where: {
                id,
            },
            attributes: ["id", "productName", "description", "price", "stockQuantity", "shippingAmount", "biddingStatus", "saleStatus", "productStatus", "subsidy", "bid_id"],
            include: [{
                model: db.category,
                as: "category",
                attributes: ["categoryName"]
            }, {
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName"]
            }, {
                model: db.productImages,
                as: "product_images",
                attributes: ["image"]
            }]
        });

        if (products.length === 0) return res.status(404).send({ message: "No products found!" });

        res.status(200).send({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Products."
        });
    }
}