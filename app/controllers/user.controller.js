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

    // Create and assign a token
    const token = jwt.sign({ email, hashedPassword }, 'marketplace-secret-key', { expiresIn: '12h' });

    res.status(200).json({
        message: "User created successfully",
        token,
        user: buyer
    });
}

// =================== Buyer, Farmer and Company Login ===================
exports.buyerFarmerLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

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
        companyImage: filename,
        role_id
    });

    // Create and assign a token
    const token = jwt.sign({ email, hashedPassword }, 'marketplace-secret-key', { expiresIn: '12h' });

    res.status(200).json({
        message: "User created successfully",
        token,
        user: company
    });
}