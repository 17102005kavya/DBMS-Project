// orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/distrbtrController');

// Route to get all orders for a distributor
router.get('/orders/:distributorId', orderController.getDistributorOrders);

// Route to update order status
router.put('/orders/:orderId/status', orderController.updateOrderStatus);

// Route to get distributor profile details
router.get('/distributor/:distributorId', orderController.getDistributorProfile);

module.exports = router;