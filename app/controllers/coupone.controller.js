const db = require("../models");
const coupone = db.coupone;

exports.addCoupon = async (req, res) => {
    const { couponeCode, couponeDiscount, couponeStatus } = req.body;
    try {
        const coupons = await coupone.create({
            couponeCode,
            couponeDiscount,
            couponeStatus
        });
        res.status(200).send({
            message: "Coupon added successfully",
            coupons
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Coupon."
        });
    }
}
