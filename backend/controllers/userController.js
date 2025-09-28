const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require("../models/Order");
const Wishlist = require("../models/Wishlist");
const SearchHistory = require("../models/SearchHistory");
const RecentlyViewed = require("../models/RecentlyViewed");

// Create new user (Register)
exports.createUser = async (req, res) => {
  const { name, email, password, phone, address,role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,role
    });

    res.status(201).json({message:"Registered"});
  } catch (err) {
    console.log("Create User Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Logout user (Client-side implementation)
exports.logoutUser = async (req, res) => {
  try {
    res.json({ message: "Logout successful. Please delete token on client side." });
  } catch (err) {
    console.log("Logout Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log("Get All Users Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.log("Get User Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, address, imageurl } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    console.log("Update User Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();  // 👈 will also delete carts now
    res.json({ message: "User and related carts deleted successfully" });
  } catch (err) {
    console.log("Delete User Error:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.clearAccountData = async (req, res) => {
  try {
    const userId = req.user.id; // fetched from JWT middleware

    // Delete dependent data first (respect FK constraints)
    await Promise.all([
      Order.destroy({ where: { userId } }),
      Wishlist.destroy({ where: { userId } }),
      SearchHistory.destroy({ where: { userId } }),
      RecentlyViewed.destroy({ where: { userId } })
    ]);

    // Finally delete the user
    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: "Account and all related data cleared successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to clear account data" });
  }
};
