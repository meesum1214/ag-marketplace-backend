module.exports = app => {
    const coupone = require("../controllers/coupon.controller.js")
    const router = require("express").Router();

    router.post("/addCoupon", coupone.addCoupon);
    router.get("/getCoupons", coupone.getCoupons);


    app.use('/coupone/api', router);
}