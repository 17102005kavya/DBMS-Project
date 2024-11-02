const express = require('express');
const router = express.Router();
const {
    addProduct,
    getDistributor,
    getLateDistributors,
    getProduct,
    addDistributor,
    getSupplierInfo,
    deleteProduct
} = require('../controllers/supplierController');

// Route to add a new product
router.post('/supplier/product', addProduct);

// Route to get distributors with order_received <= 10
router.get('/distributors', getDistributor);

// Route to assign a product to a distributor
router.post('/distributor/assign', addDistributor);

// Route to get products by supplier id
router.get('/products/:supplierid', getProduct);

// Route to get distributors who are late in deliveries
router.get('/distributors/late/:supplierId', getLateDistributors);

// Route to get supplier information by supplier id
router.get('/supplier/:supplierId', getSupplierInfo);

router.delete('/products/:productId', deleteProduct);

module.exports = router;
