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
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        },
        stockQuantity: {
            type: Sequelize.INTEGER
        },
        shippingAmount:{
            type: Sequelize.INTEGER
        },
        biddingStatus: {
            type: Sequelize.BOOLEAN
        },
        saleStatus: {
            type: Sequelize.BOOLEAN
        },
        subsidy:{
            type: Sequelize.STRING
        }
    });
    return Product;
};