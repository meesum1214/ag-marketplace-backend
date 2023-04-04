module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // =============== Fertilizer Specific Fields ===============
        productName: { // ======== productName is on both Fertilizer and Plant Pathology & Entomology ========
            type: Sequelize.STRING
        },
        composition: { // ======== composition is on both Fertilizer and Plant Pathology & Entomology ========
            type: Sequelize.STRING
        },
        unit: { // ======== unit is on both Fertilizer and Plant Pathology & Entomology ========
            type: Sequelize.STRING
        },
        // =============== Seed Specific Fields ===============
        seed: {
            type: Sequelize.STRING
        },
        seed_variety: {
            type: Sequelize.STRING
        },
        seed_type: {
            type: Sequelize.STRING
        },
        seed_suitablity: {
            type: Sequelize.STRING
        },
        seed_weight_kg: {
            type: Sequelize.STRING
        },
        weight_per_seed: {
            type: Sequelize.STRING
        },
        // =============== Plant Patholody & Entomogy Specific Fields ===============
        plant_category_type: {
            type: Sequelize.STRING
        },
        plant_product_type: {
            type: Sequelize.STRING
        },
        plant_pathology_weight: {
            type: Sequelize.STRING
        },
        // =============== Mandetory Fields ===============
        brandName: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.STRING
        },
        packaging: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        discountType: {
            type: Sequelize.STRING
        },
        discount: {
            type: Sequelize.STRING
        },
        biddingStatus: {
            type: Sequelize.STRING
        },
        shippingAmount:{
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        subsidy:{
            type: Sequelize.STRING
        },
        tax_percentage:{
            type: Sequelize.STRING
        },
        productStatus: {
            type: Sequelize.STRING
        },
        bid_id: {
            type: Sequelize.INTEGER
        },
    });
    return Product;
};