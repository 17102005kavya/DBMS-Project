const db = require('../config/db'); // Assuming db is where the MySQL connection pool is established

// Get Products
const getProducts = async (req, res) => {
    const sql = 'SELECT * FROM Products';  // SQL query to fetch all products

    try {
        const result = await db.execute(sql);  // Execute the query
         // Log the result to inspect its structure
        
        // Check if result[0] exists and is an array
        const rows = result && result[0] ? result[0] : [];  // Default to an empty array if no data
        res.json(rows);  // Send the products data as JSON response
    } catch (err) {
        console.error('Error fetching products:', err);  // Log the error for debugging
        return res.status(500).json({ error: 'Error fetching products: ' + err.message });  // Send error response
    }
};



// Place an or
// Place an order (only product_id and retailer_id)
const placeOrder = async (req, res) => {
    const { product_id, quantity, retailer_id } = req.body;  // Extract product_id and quantity from the request body
     // Fixed retailer_id

    // Validate input
    if (!product_id || !quantity) {
        return res.status(400).json({ error: 'Missing product_id or quantity' });
    }

    // Get the product details (price) from the database
    const productQuery = 'SELECT product_price FROM Products WHERE product_id = ?';
    let product;
    try {
        const [rows] = await db.execute(productQuery, [product_id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product = rows[0];
    } catch (err) {
        console.error('Error fetching product details:', err);
        return res.status(500).json({ error: 'Error fetching product details' });
    }

    const total_price = product.product_price * quantity;  // Calculate total price for the order

    // Calculate the expected delivery date (current date + 3 days)
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);

    // Format the date as YYYY-MM-DD
    const expected_date = currentDate.toISOString().split('T')[0];

    // Insert a new order into the Orders table
    const orderSql = 'INSERT INTO Orders (distributor_id, retailer_id, order_status, order_date) VALUES (?, ?, ?, ?)';
    let order_id;
    try {
        const [orderResult] = await db.execute(orderSql, [1, retailer_id, 'Pending', new Date()]);
        order_id = orderResult.insertId;  // Get the inserted order ID
    } catch (err) {
        console.error('Error placing order:', err);
        return res.status(500).json({ error: 'Error placing order' });
    }

    // Insert the order details into OrderDetails table
    const orderDetailsSql = 'INSERT INTO OrderDetails (order_id, product_id, quantity, price, expected_date) VALUES (?, ?, ?, ?, ?)';
    try {
        await db.execute(orderDetailsSql, [order_id, product_id, quantity, total_price, expected_date]);
        res.status(201).json({ message: 'Order placed successfully', order_id });
    } catch (err) {
        console.error('Error inserting order details:', err);
        return res.status(500).json({ error: 'Error inserting order details' });
    }
};





// Get all orders for retailer_id = 4
const getAllOrders = async (req, res) => {
    const retailer_id = req.params.retailer_id;

    // Validate the retailer_id
    if (!retailer_id || isNaN(retailer_id)) {
        return res.status(400).json({ error: 'Invalid or missing retailer_id' });
    }

    console.log(`Fetching orders for retailer_id: ${retailer_id}`);

    // Query to fetch all orders for the given retailer_id
    const sql = `
       SELECT 
    order_id, 
    product_id, 
    quantity, 
    price, 
    expected_date
FROM 
    OrderDetails
WHERE 
    order_id IN (SELECT order_id FROM Orders WHERE retailer_id = ?);
    `;

    try {
        const [result] = await db.execute(sql, [retailer_id]);

        // Log the result for debugging purposes
        console.log('Orders fetched:', result);

        // Return the result as JSON
        res.json(result);
    } catch (err) {
        // Log the error for debugging
        console.error('Error fetching orders:', err);
        return res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
};

// Track an order by order_id
const trackOrder = async (req, res) => {
    const order_id = req.params.order_id;
    const sql = `SELECT 
            order_id, 
            retailer_id, 
            distributor_id, 
            order_status 
        FROM Orders 
        WHERE order_id = ?`;
 
    try {
        const [result] = await db.execute(sql, [order_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(result[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get order details by order_id
const getOrderDetails = async (req, res) => {
    const order_id = req.params.order_id;
    const sql = 'SELECT * FROM OrderDetails WHERE order_id = ?';

    try {
        const [result] = await db.execute(sql, [order_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Order details not found' });
        }
        res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    placeOrder,
    getAllOrders,
    trackOrder,
    getOrderDetails,
    getProducts,
};
