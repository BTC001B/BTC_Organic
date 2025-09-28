const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.delete("/clear-cache",authenticateToken,userController.clearAccountData);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
