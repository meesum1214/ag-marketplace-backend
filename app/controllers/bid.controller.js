const db = require("../models");
const Bid = db.bid;

exports.addBid = async (req, res) => {
    const { bidAmount, user_id, product_id, bidDescription } = req.body;
    try {
        const bid = await Bid.create({
            bidAmount,
            user_id,
            product_id,
            bidDescription,
            bidStatus: "1"
        });
        res.status(200).send({
            message: "Bid added successfully",
            bid
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Bid."
        });
    }
};

exports.getAllBids = async (req, res) => {
    const { product_id } = req.params;
    try {
        const bid = await Bid.findAll({
            where: { product_id, bidStatus: "1" },
            include: [
                {
                    model: db.user,
                    as: "user",
                    attributes: ["id", "firstName", "lastName", "email"]
                },
                {
                    model: db.product,
                    as: "product",
                    attributes: ["id", "productName", "price"]
                }
            ]
        });

        if (bid.length === 0) return res.status(404).send({ message: "No bids found for this product" });

        res.status(200).send({
            message: "Bid fetched successfully",
            bid,
            totalBids: bid.length
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while fetching the Bid."
        });
    }
};

exports.deleteBid = async (req, res) => {
    const { bid_id } = req.query;
    try {
        const bid = await Bid.update(
            { bidStatus: "0" },
            { where: { id: bid_id } }
        );

        if(bid[0] === 0) return res.status(404).send({ message: "No bid found with this id" });

        res.status(200).send({
            message: "Bid updated successfully",
            bid
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the Bid."
        });
    }
};