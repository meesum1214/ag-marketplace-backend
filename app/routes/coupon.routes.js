module.exports = app => {
    const coupone = require("../controllers/coupone.controller.js")
    const router = require("express").Router();
    // const { authJwt } = require("../middlewares");
    // app.use([authJwt.verifyToken]);

    router.post("/addCoupon", coupone.addCoupon);
    router.get("/getCoupons", coupone.getCoupons);
    router.delete("/deleteCoupon", coupone.deleteCoupon);

    app.use('/coupone/api', router);
}