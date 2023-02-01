module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: Sequelize.STRING
        },
        categoryType: {
            type: Sequelize.STRING
        },
        
       
    });
    return Category;
};