const db = require("../models");
const Product = db.product;

exports.addProducts = async (req, res) => {
    const { filename } = req.file;
    const { productName, description, price, stockQuantity, biddingStatus, saleStatus, user_id, category_id,shippingAmount } = req.body;
    
    try {
        const product = await Product.create({
            productName,
            description,
            price,
            image:filename,
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
