module.exports = app => {
    const bids = require("../controllers/bid.controller.js");
    const router = require("express").Router();

    router.post("/add", bids.addBid);
    router.post("/deleteBid", bids.deleteBid);
    router.get(`/getall/:product_id`, bids.getAllBids);

    app.use('/api/bid', router);
}