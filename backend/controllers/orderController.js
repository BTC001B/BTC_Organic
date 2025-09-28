const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart"); // your existing Cart model
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you have auth

    // Get cart items including Product info
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }]
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.quantity * item.Product.price;
    });

    // Create order
    const order = await Order.create({ userId, totalAmount });

    // Create order items and reduce stock
    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product.price // ✅ price from Product
      });

      // reduce stock
      item.Product.stock -= item.quantity;
      await item.Product.save();
    }

    // Clear cart
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ message: "Order created successfully", orderId: order.id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "OrderItems", // must match Order.hasMany(..., as: "OrderItems")
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price", "imageUrl", "stock"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]] // newest orders first
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
