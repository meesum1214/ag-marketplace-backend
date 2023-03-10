const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

// =================== Buyer and Farmer Register ===================
exports.buyerFarmerRegister = async (req, res) => {
    const { firstName, lastName, email, password, role_id } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in database with his role from roles table
    const buyer = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role_id
    });
    
    let myUser = await User.findOne({
        where: { email },
        include: [{
            model: db.roles,
            as: "role",
            attributes: ["role"]
        }]
    });

    // Create and assign a token
    const token = jwt.sign({ email, hashedPassword }, 'marketplace-secret-key', { expiresIn: '12h' });

    res.status(200).json({
        message: "User created successfully",
        token,
        user: myUser
    });
}

// =================== Buyer, Farmer and Company Login ===================
exports.buyerFarmerLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{
            model: db.roles,
            as: "role",
            attributes: ["role"]
        }]
    });

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    let hashedPassword = user.password;
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email, hashedPassword }, 'marketplace-secret-key', { expiresIn: '12h' });

    res.status(200).json({
        message: "User logged in successfully",
        token,
        user
    });
}

// =================== Seller Register ===================
exports.companyRegister = async (req, res) => {
    const { filename } = req.file;
    const { firstName, lastName, email, password, companyName, role_id } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in database with his role from roles table
    const company = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        companyName,
        companyImage: 'https://agronomics.pk/productImages/' + filename,
        role_id
    });

    let mycomPany = await User.findOne({
        where: { email },
        include: [{
            model: db.roles,
            as: "role",
            attributes: ["role"]
        }]
    });

    // Create and assign a token
    const token = jwt.sign({ email, hashedPassword }, 'marketplace-secret-key', { expiresIn: '12h' });

    res.status(200).json({
        message: "User created successfully",
        token,
        user: mycomPany
    });
}

// =================== Get All Companies ===================
exports.getAllCompanies = async (req, res) => {
    const companies = await User.findAll({
        where: { role_id: 1 },
        attributes: {
            exclude: ["role_id"]
        },
    });

    if(companies.length === 0) return res.status(400).json({ message: "No companies found" });

    res.status(200).json({
        message: "Companies fetched successfully",
        companies
    });
}

// =================== Get All Farmers ===================
exports.getAllFarmers = async (req, res) => {
    const farmers = await User.findAll({
        where: { role_id: 2 },
        attributes: {
            exclude: ["role_id", "companyName", "companyImage"]
        },
    });

    if(farmers.length === 0) return res.status(400).json({ message: "No farmers found" });

    res.status(200).json({
        message: "Farmers fetched successfully",
        farmers
    });
}

// =================== Get All Buyers ===================
exports.getAllBuyers = async (req, res) => {
    const buyers = await User.findAll({
        where: { role_id: 3 },
        attributes: {
            exclude: ["role_id", "companyName", "companyImage"]
        },
    });

    if(buyers.length === 0) return res.status(400).json({ message: "No buyers found" });

    res.status(200).json({
        message: "Buyers fetched successfully",
        buyers
    });
}