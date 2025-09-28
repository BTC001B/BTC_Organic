const express = require('express');
const cors = require('cors');
require('dotenv').config();


const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const Wishlist = require("./models/Wishlist");
const SearchHistory = require("./models/SearchHistory");
const RecentlyViewed = require("./models/RecentlyViewed");



const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const recentlyViewedRoutes = require('./routes/recentlyViewedRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const couponRouters = require('./routes/couponRoutes');
const adminRoutes = require('./routes/adminRoutes');
const searchRoutes = require("./routes/searchRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/recently-viewed', recentlyViewedRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/coupons', couponRouters);
app.use('/api/admin', adminRoutes);
app.use('/api/search',searchRoutes);
app.use("/api/order",orderRoutes);


User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Wishlist, { foreignKey: "userId" });
Wishlist.belongsTo(User, { foreignKey: "userId" });

User.hasMany(SearchHistory, { foreignKey: "userId" });
SearchHistory.belongsTo(User, { foreignKey: "userId" });

User.hasMany(RecentlyViewed, { foreignKey: "userId" });
RecentlyViewed.belongsTo(User, { foreignKey: "userId" });

// Product Relations
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(Wishlist, { foreignKey: "productId" });
Wishlist.belongsTo(Product, { foreignKey: "productId" });

// Order Relations
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "OrderItems" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });



const PORT = process.env.PORT || 3004;


sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .then(() => sequelize.sync())
  .then(() => console.log('Models synced.'))
  .catch(err => console.log('Error: ' + err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
