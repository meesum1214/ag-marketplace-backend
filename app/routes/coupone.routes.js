module.exports = app => {
    const coupone = require("../controllers/coupone.controller.js")
    const router = require("express").Router();

    router.post("/addCoupon", coupone.addCoupon);
    router.get("/getCoupons", coupone.getCoupons);
    router.get("/updateCoupon", coupone.updateCoupon);


    app.use('/coupone/api', router);
}