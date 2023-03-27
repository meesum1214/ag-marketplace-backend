module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_quantity: {
            type: Sequelize.INTEGER
        },
    });
    return Cart;
}