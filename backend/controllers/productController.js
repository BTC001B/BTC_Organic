const Product = require('../models/Product');
const RecentlyViewed =require("../models/RecentlyViewed");
const { Op } = require('sequelize');

// Create
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.bulkCreate(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
  }
};

// Get all
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// Get by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.viewCount+=1
    await product.save();
    const userId = req.user.id;
    
    await RecentlyViewed.upsert({
      userId,
      productId: req.params.id,
      viewedAt: new Date()
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

// Similar products by tags
exports.getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const tagsArray = product.tags
      ? product.tags.split(',').map(tag => tag.trim().toLowerCase())
      : [];

    if (tagsArray.length === 0) return res.json([]);

    const tagConditions = tagsArray.map(tag => ({
      tags: { [Op.iLike]: `%${tag}%` }
    }));

    const similarProducts = await Product.findAll({
      where: {
        id: { [Op.ne]: id },
        [Op.or]: tagConditions
      },
      limit: 10
    });

    res.json(similarProducts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch similar products', error: err.message });
  }
};

// Popular products by sellCount
exports.getPopularProducts = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.findAll({
      where: { categoryId },
      order: [['sellCount', 'DESC']],
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch popular products', error: err.message });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId, 10);

    const items = await Product.findAll({
      where: { categoryId } // ✅ filter
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No Item Found" });
    }

    res.json({ items }); // note plural
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const item = await Product.findAll({ where: { isTrend: true } });

    if (!item || item.length === 0) {
      return res.status(404).json({ message: "No Product on Trends" });
    }

    res.status(200).json({
      message: "These are Trending Products",
      item: item
    });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ message: "Error Occurs" });
  }
};
 

exports.getAllVerified = async (req, res) => {
  try {
    const items = await Product.findAll({ where: { isVerified: true } });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No Products Found" });
    }

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching verified products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
