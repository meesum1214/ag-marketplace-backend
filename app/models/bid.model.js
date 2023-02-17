module.exports = (sequelize, Sequelize) => {
    const Bid = sequelize.define("bids", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bidAmount: {
            type: Sequelize.INTEGER
        },
        bidStatus: {
            type: Sequelize.STRING
        },
        bidDescription: {
            type: Sequelize.STRING
        },
    });
    return Bid;
}