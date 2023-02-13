const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// =============== All Models ===============
// =============== User Models ===============
db.user = require("./user.model.js")(sequelize, Sequelize);
db.roles=require("./roles.model.js")(sequelize, Sequelize);

// =============== Product Models ===============
db.product = require("./product.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.review = require("./reviews.model.js")(sequelize, Sequelize);

// =============== Order Model ===============
db.order = require("./order.model.js")(sequelize, Sequelize);

// ============= Coupone Model ===============
db.coupone = require("./coupon.model.js")(sequelize, Sequelize);

// =============== All Relations ===============
// =============== Relation Between User and Roles ===============
db.user.belongsTo(db.roles, {foreignKey: 'role_id'});
db.roles.hasMany(db.user, {foreignKey: 'role_id'});

// =============== Relation Between Product and Category ===============
db.product.belongsTo(db.category, {foreignKey: 'category_id'});
db.category.hasMany(db.product, {foreignKey: 'category_id'});

// =============== Relation Between Product and User ===============
db.product.belongsTo(db.user, {foreignKey: 'user_id'});
db.user.hasMany(db.product, {foreignKey: 'user_id'});

// =============== Relation Between Product and Review ===============
db.product.hasMany(db.review, {foreignKey: 'product_id'});
db.review.belongsTo(db.product, {foreignKey: 'product_id'});

// =============== Relation Between User and Review ===============
db.user.hasMany(db.review, {foreignKey: 'user_id'});
db.review.belongsTo(db.user, {foreignKey: 'user_id'});

// =============== Relation Between User and Order ===============
db.user.hasMany(db.order, {foreignKey: 'user_id'});
db.order.belongsTo(db.user, {foreignKey: 'user_id'});

// =============== Relation Between Product and Order ===============
db.product.hasMany(db.order, {foreignKey: 'product_id'});
db.order.belongsTo(db.product, {foreignKey: 'product_id'});


// =============== Relation Between User and Coupone ===============

db.user.hasOne(db.coupone, {foreignKey: 'user_id'});
db.coupone.belongsTo(db.user, {foreignKey: 'user_id'});






module.exports = db;