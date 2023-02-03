module.exports = app => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();
    const upload = require('../middlewares/companyImage.middleware');

    router.post("/buyerfarmer/register", users.buyerFarmerRegister);
    router.post("/buyerfarmer/login", users.buyerFarmerLogin);
    router.post("/company/register", upload.single('companyImage'), users.companyRegister);
    
    app.use('/auth/api', router);
}