module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define("user", {
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
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        companyName: {
            type: Sequelize.STRING
        },
        companyImage: {
            type: Sequelize.STRING
        },



    });
    return User;
};