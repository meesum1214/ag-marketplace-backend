module.exports = (sequelize, Sequelize) => {
    const Reviews = sequelize.define("reviews", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        review: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
    });
    return Reviews;
}
