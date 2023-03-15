const db = require("../models");
const coupone = db.coupon;

exports.addCoupon = async (req, res) => {
    const { couponCode, discount, startDate, endDate, user_id } = req.body;

    try {

        const couponExists = await coupone.findOne({
            where: {
                couponCode
            }
        });

        if (couponExists) {
            return res.status(400).send({
                message: "Coupon already exists"
            });
        }
        
        const coupons = await coupone.create({
            couponCode,
            discount,
            status: "okay",
            startDate,
            endDate,
            user_id
        });

        const coupon = await coupone.findOne({
            where: {
                id: coupons.id
            },
            attributes: ["couponCode", "discount", "status", "startDate", "endDate"],
            include: [{
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName", "email"]
            }]
        });

        res.status(200).send({
            message: "Coupon added successfully",
            coupon
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Coupon."
        });
    }
}

exports.getCoupons = async (req, res) => {
    const { user_id } = req.query;

    try {
        const coupons = await coupone.findAll({
            where: {
                user_id
            },
            attributes: ["id", "couponCode", "discount", "status", "startDate", "endDate"],
            include: [{
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName", "email"]
            }]
        });

        if (!coupons) {
            return res.status(404).send({
                message: "Coupons not found"
            });
        }

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

exports.deleteCoupon = async (req, res) => {
    const { id } = req.query;

    try {
        const coupon = await coupone.findOne({
            where: {
                id
            },
            attributes: ["couponCode", "discount", "status", "startDate", "endDate"],
            include: [{
                model: db.user,
                as: "user",
                attributes: ["firstName", "lastName", "email"]
            }]
        });

        if (!coupon) {
            return res.status(404).send({
                message: "Coupon not found with id " + id
            });
        }

        await coupone.destroy({
            where: {
                id
            }
        });

        res.status(200).send({
            message: "Coupon deleted successfully",
            coupon
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the Coupon."
        });
    }
}