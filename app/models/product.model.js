module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        stockQuantity: {
            type: Sequelize.STRING
        },
        shippingAmount:{
            type: Sequelize.STRING
        },
        biddingStatus: {
            type: Sequelize.STRING
        },
        saleStatus: {
            type: Sequelize.STRING
        },
        productStatus: {
            type: Sequelize.STRING
        },
        subsidy:{
            type: Sequelize.STRING
        },
        bid_id: {
            type: Sequelize.INTEGER
        }
    });
    return Product;
};