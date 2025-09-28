const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require("../middlewares/authMiddleware")

// CRUD
router.get("/similarproducts/:id",productController.getSimilarProductsInCategory);
router.get("/verified",productController.getAllVerified);
router.get('/trends',productController.getTrends);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id',authMiddleware.authenticateToken, productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get("/categoryid/:categoryId",productController.getProductByCategory);

// Extras
router.get('/similar/:id', productController.getSimilarProducts);
router.get('/popular/:categoryId', productController.getPopularProducts);


module.exports = router;