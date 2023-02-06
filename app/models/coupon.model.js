const { MEDIUMINT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define("coupon", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        couponCode: {
            type: Sequelize.STRING
        },
        discount: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.STRING
        },
        endDate: {
            type: Sequelize.STRING
        },
        usageLimit:
        {
            type: Sequelize.INTEGER,
        },
        usageCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    return Coupon;
}