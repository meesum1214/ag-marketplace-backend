module.exports = app => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();
    router.post("/buyerfarmer/register", users.buyerFarmerRegister);
    router.post("/buyerfarmer/login", users.buyerFarmerLogin);
    router.post("/company/register", users.companyRegister);
    app.use('/auth/api', router);
}