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
                include: {
                    model: db.user,
                    attributes: ['name'],
                },
                include: {
                    model: db.product,
                    attributes: ['productName'],
                }
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Review."
        });
    }
}