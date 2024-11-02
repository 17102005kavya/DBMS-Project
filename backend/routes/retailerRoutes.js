// routes/retailer.js
const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders, trackOrder, getOrderDetails, getProducts } = require('../controllers/retailerController');

router.post('/place_order', placeOrder);  // Call placeOrder from the controller
router.get('/all_orders/:retailer_id', getAllOrders);
router.get('/track_order/:order_id', trackOrder);
router.get('/order_details/:order_id', getOrderDetails);
router.get('/products', getProducts);  // Route to get all products

module.exports = router;
