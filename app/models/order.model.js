module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        productDetails:{
            type: Sequelize.STRING
        },
        city:{
            type: Sequelize.STRING
        },
        address:{
            type: Sequelize.STRING
        },
        apartment:{
            type: Sequelize.STRING
        },
        zipCode:{
            type: Sequelize.STRING
        },
        phone:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        paymentMethod:{
            type: Sequelize.STRING
        },
        orderStatus:{
            type: Sequelize.STRING
        },        
    });
    return Order;
};