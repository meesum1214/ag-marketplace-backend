const db = require("../models");
const Product = db.product;
const Review = db.review;

exports.addProducts = async (req, res) => {
    const { filename } = req.file;
    const { productName, description, price, stockQuantity, biddingStatus, saleStatus, user_id, category_id, shippingAmount } = req.body;

    try {
        const product = await Product.create({
            productName,
            description,
            price,
            image: filename,
            stockQuantity,
            shippingAmount,
            biddingStatus,
            saleStatus,
            category_id,
            user_id,
        });
        res.status(200).send({
            message: "Product added successfully",
            product
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

        if(reviews.length === 0) return res.status(404).send({message: "No reviews found for this product."});

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