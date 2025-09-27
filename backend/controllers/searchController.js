const SearchHistory = require("../models/SearchHistory");
const Product = require("../models/Product"); 
const { Op } = require("sequelize");


exports.searchProduct = async (req, res) => {
  try {
    const { q } = req.params;  
    const userId = req.user ? req.user.id : null; 
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    await SearchHistory.create({ userId, query: q });
    const products = await Product.findAll({
      where: {
        name: { [Op.iLike]: `%${q}%` },   
      }
    });
    res.json({
      query: q,
      count: products.length,
      results: products,
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
};


