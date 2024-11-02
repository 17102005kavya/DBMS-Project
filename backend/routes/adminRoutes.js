const express = require('express');
const router = express.Router();
const {
    addSupplier,
    getSuppliers,
    getBestSeller,
    getBestSellingProducts,
} = require('../controllers/adminController'); // Adjust the path as needed

// Route to get best-selling products
router.get('/best-selling-products', getBestSellingProducts);

// Route to get best-selling suppliers
router.get('/best-seller', getBestSeller);

// Route to get suppliers
router.get('/suppliers', getSuppliers);

// Route to add a supplier
router.post('/suppliers', addSupplier);

module.exports = router;
