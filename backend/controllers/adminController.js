const pool = require('../config/db');

const handleError = (res, message, error) => {
    console.error(message, error);
    res.status(500).json({ error: message });
};

const addSupplier = async (req, res) => {
    const { supplier_name, supplier_contact, supplier_address } = req.body;

    if (!supplier_name || !supplier_contact || !supplier_address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO Supplier (supplier_name, supplier_contact, supplier_address) VALUES (?, ?, ?)';
    try {
        const [result] = await pool.query(sql, [supplier_name, supplier_contact, supplier_address]);
        res.status(201).json({ message: 'Supplier added successfully', supplier_id: result.insertId });
    } catch (error) {
        handleError(res, 'Error adding supplier:', error);
    }
};

const getSuppliers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT supplier_id, supplier_name, supplier_contact, supplier_address FROM Supplier');
        res.json(rows);
    } catch (error) {
        handleError(res, 'Error fetching suppliers:', error);
    }
};

const getBestSeller = async (req, res) => {
    const sql = `
        SELECT s.supplier_id,s.supplier_name, SUM(od.quantity * p.product_price) AS total_sales
        FROM Supplier s
        JOIN Products p ON s.supplier_id = p.supplier_id
        JOIN OrderDetails od ON p.product_id = od.product_id
        JOIN Orders o ON od.order_id = o.order_id
        GROUP BY s.supplier_id
        ORDER BY total_sales DESC
        LIMIT 5;
    `;

    try {
        const [result] = await pool.query(sql);
        res.status(200).json(result);
    } catch (error) {
        handleError(res, 'Error fetching best-selling suppliers:', error);
    }
};

const getBestSellingProducts = async (req, res) => {
    const sql = `
        SELECT p.product_id,p.product_name, SUM(od.quantity) AS total_sold
        FROM Products p
        JOIN OrderDetails od ON p.product_id = od.product_id
        JOIN Orders o ON od.order_id = o.order_id
        GROUP BY p.product_id
        ORDER BY total_sold DESC
        LIMIT 5;
    `;

    try {
        const [results] = await pool.query(sql);
        res.status(200).json(results);
    } catch (error) {
        handleError(res, 'Error fetching best-selling products:', error);
    }
};

module.exports = {
    addSupplier,
    getSuppliers,
    getBestSeller,
    getBestSellingProducts,
};