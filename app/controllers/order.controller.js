const db = require("../models");
const order = db.order;

exports.addOrder = async (req, res) => {
    const { user_id, product_id, firstName, lastName, productDetails, city, address, apartment, zipCode, phone, email, paymentMethod, orderStatus } = req.body;
    try {
        const orders = await order.create({
            user_id,
            product_id,
            firstName,
            lastName,
            productDetails,
            city,
            address,
            apartment,
            zipCode,
            phone,
            email,
            paymentMethod,
            orderStatus
        });
        res.status(200).send({
            message: "Order added successfully",
            orders
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Order."
        });
    }
};

exports.getOrders = async (req, res) => {
        const { user_id } = req.query;

    try {
        const orders = await order.findAll({
            where: {
                user_id
            },
            attributes: ["id", "firstName", "lastName", "productDetails", "city", "address", "apartment", "zipCode", "phone", "email", "paymentMethod", "orderStatus"],
            include: [{
                model: db.product,
                as: "product",
                attributes: ["id", "productName", "price", "description", "image"]
            },
            {
                model: db.user,
                as: "user",
                attributes: ["id", "firstName", "lastName", "email"]
            }
        ]
        });
        res.status(200).send({
            message: "Orders fetched successfully",
            orders
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Orders."
        });
    }
}