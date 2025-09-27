const Product  = require('../models/Product');
const Cart  = require('../models/Cart');
const { Op } = require('sequelize');

// ✅ Add to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const existingItem = await Cart.findOne({ where: { userId, productId } });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "Quantity updated", cartItem: existingItem });
    }

    const newItem = await Cart.create({ userId, productId, quantity });
    res.status(201).json({ message: "Added to cart", cartItem: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get cart items for a user
exports.getCartByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }]
    });

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update cart quantity
exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: "Quantity updated", cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Remove item from cart
exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Cart.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Cart item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Clear all cart items for a user
exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await Cart.destroy({ where: { userId } });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
