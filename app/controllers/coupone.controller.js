const db = require("../models");
var voucher_codes = require('voucher-code-generator');
const coupone = db.coupone;


exports.addCoupon = async (req, res) => {
    const { discount, status, startDate, endDate } = req.body;
    const code = voucher_codes.generate({
        length: 8,
        count: 1,
        charset: voucher_codes.charset("alphanumeric")
    });
    try {
        const coupons = await coupone.create({
            couponeCode: code,
            discount,
            status,
            startDate,
            endDate,
    

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

exports.getCoupons = async (req, res) => {
    const { product_id } = req.query;

    try {
        const coupons = await coupone.findAll({
            where: {
                product_id
            },
            attributes: ["couponeCode", "discount", "status", "startDate", "endDate"],
            include: [{
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName", "email"]
            }]
        });
        res.status(200).send({
            message: "Coupon fetched successfully",
            coupons
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Coupon."
        });
    }
}

exports.updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { discount, status, startDate, endDate, usageLimit, usageCount } = req.body;
    try {
        const coupons = await coupone.update({
            discount,
            status,
            startDate,
            endDate,
        }, {
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Coupon updated successfully",
            coupons
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the Coupon."
        });
    }
}
