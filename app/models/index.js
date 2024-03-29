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
db.coupon = require("./coupon.model.js")(sequelize, Sequelize);

// ============= Bid Model ===============
db.bid = require("./bid.model.js")(sequelize, Sequelize);

// ============= Product Images Model ===============
db.productImages = require("./productImages.model.js")(sequelize, Sequelize);

// ============= Cart Model =================
db.cart = require("./cart.model.js")(sequelize, Sequelize);

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

// =============== Relation Between Product and ProductImages ===============
db.product.hasMany(db.productImages, {foreignKey: 'product_id'});
db.productImages.belongsTo(db.product, {foreignKey: 'product_id'});

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
// db.product.hasMany(db.order, {foreignKey: 'product_id'});
// db.order.belongsTo(db.product, {foreignKey: 'product_id'});

// =============== Relation Between User and Coupone ===============
db.user.hasMany(db.coupon, {foreignKey: 'user_id'});
db.coupon.belongsTo(db.user, {foreignKey: 'user_id'});

// =============== Relation Between bid and product ===============
db.product.hasMany(db.bid, {foreignKey: 'product_id'});
db.bid.belongsTo(db.product, {foreignKey: 'product_id'});
db.user.hasMany(db.bid, {foreignKey: 'user_id'});
db.bid.belongsTo(db.user, {foreignKey: 'user_id'});

// =============== Relation Between Product, product_images, user and Cart ===============
db.product.hasMany(db.cart, {foreignKey: 'product_id'});
db.cart.belongsTo(db.product, {foreignKey: 'product_id'});
db.user.hasMany(db.cart, {foreignKey: 'user_id'});
db.cart.belongsTo(db.user, {foreignKey: 'user_id'});

module.exports = db;