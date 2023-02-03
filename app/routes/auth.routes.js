module.exports = app => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();
    const upload = require('../middlewares/companyImage.middleware');

    router.post("/buyerfarmer/register", users.buyerFarmerRegister);
    router.post("/buyerfarmer/login", users.buyerFarmerLogin);
    router.post("/company/register", upload.single('companyImage'), users.companyRegister);
    router.get("/company/getall", users.getAllCompanies);
    router.get("/farmer/getall", users.getAllFarmers);
    router.get("/buyer/getall", users.getAllBuyers);
    
    app.use('/auth/api', router);
}