module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define("product_images", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: Sequelize.STRING
        }
    });
    return ProductImage;
};