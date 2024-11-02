const pool = require('../config/db');

const addProduct = async (req, res) => {
    const { supplier_id, product_name, product_price, stock } = req.body;  

    try {
        const [result] = await pool.query(
            'INSERT INTO Products (supplier_id, product_name, product_price, stock) VALUES ( ?, ?, ?, ?)',
            [supplier_id, product_name, product_price, stock]
        );
        
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            productId: result.product_id 
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to add product',
            error: err.message
        });
    }
};

const getDistributor = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM Distributor WHERE order_received <= 10'
        );
        res.status(201).json({
            success: true,
            message: 'Distributors shown successfully',
            distributorList: result
        });
    } catch (error) {
        console.error('Error displaying distributors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to show distributors',
            error: error.message
        });
    }
};

const addDistributor = async (req, res) => {
    const { distributorName, distributorContact } = req.body;

    // Validate the request body to ensure distributor details are provided
    if (!distributorName || !distributorContact) {
        return res.status(400).json({ message: 'Distributor name and contact are required.' });
    }

    try {
        // Insert the new distributor with order_received = 0 by default
        const query = `
            INSERT INTO Distributor (distributor_name, distributor_contact, order_received)
            VALUES (?, ?, 0)
        `;
        await pool.query(query, [distributorName, distributorContact]);

        // Respond with a success message
        res.status(201).json({ message: 'Distributor added successfully!' });
    } catch (error) {
        console.error('Error adding distributor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getProduct = async (req, res) => {
    const supplierid = req.params.supplierid;

    try {
        const [result] = await pool.query(
            'SELECT product_id, product_name, product_price, stock FROM Products WHERE supplier_id = ?',
            [supplierid]
        );

        res.status(200).json({
            success: true,
            message: 'Products successfully displayed',
            products: result
        });
    } catch (err) {
        console.error('Error getting product:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to get product',
            error: err.message
        });
    }
};

const getLateDistributors = async (req, res) => {
    const { supplierId } = req.params; // Get supplierId from the request parameters

    try {
        const [result] = await pool.query(`
            SELECT 
                D.distributor_id,
                D.distributor_name,
                COUNT(OD.order_id) AS late_delivery_count
            FROM 
                Distributor D
            JOIN 
                Orders O ON D.distributor_id = O.distributor_id
            JOIN 
                OrderDetails OD ON O.order_id = OD.order_id
            JOIN 
                Products P ON OD.product_id = P.product_id
            WHERE 
                OD.delivered_date > OD.expected_date
                AND P.supplier_id = ?  -- Filter by supplier_id
            GROUP BY 
                D.distributor_id, D.distributor_name
            ORDER BY 
                late_delivery_count DESC;
        `, [supplierId]); // Pass supplierId as a parameter

        res.status(200).json(result); // Send the result as a response
    } catch (error) {
        console.error('Error fetching late distributors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSupplierInfo = async (req, res) => {
    const supplierId = req.params.supplierId;

    try {
        const [result] = await pool.query(
            'SELECT supplier_id, supplier_name,supplier_address, supplier_contact FROM Supplier WHERE supplier_id = ?',
            [supplierId]
        );

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Supplier information retrieved successfully',
            supplierInfo: result[0]
        });
    } catch (error) {
        console.error('Error fetching supplier information:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve supplier information',
            error: error.message
        });
    }
};
const deleteProduct = async (req, res) => {
    const { productId } = req.params; // Get productId from the request parameters

    try {
        // Query to delete the product from the Products table
        const query = `
            DELETE FROM Products 
            WHERE product_id = ?
        `;
        const [result] = await pool.query(query, [productId]);

        // Check if the product was found and deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    addProduct,
    getDistributor,
    getLateDistributors,
    getProduct,
    addDistributor,
    getSupplierInfo,
    deleteProduct
};

