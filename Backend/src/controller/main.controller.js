const userModel = require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered with this email or username' });
        }

        const hashed_pass = await bcrypt.hash(password, 10);

        const created_user = await userModel.create({
            username,
            email,
            password: hashed_pass
        });

        const token = jwt.sign({ id: created_user._id }, process.env.JWT_KEY, { expiresIn: '7d' });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(201).json({
            message: "User registered successfully",
            username
        });
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function Login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '7d' });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { Register, Login };
