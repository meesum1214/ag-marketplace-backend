const db = require("../models");
const Product = db.product;

exports.addProducts = async (req, res) => {

    const { productName, description, price, stockQuantity, biddingStatus, saleStatus, image, user_id, category_id } = req.body;

    const product = await Product.create({
        productName,
        description,
        price,
        stockQuantity,
        biddingStatus,
        saleStatus,
        image,
        user_id,
        category_id
    });

    res.status(200).json({
        message: "Product created successfully",
        product
    });
};
