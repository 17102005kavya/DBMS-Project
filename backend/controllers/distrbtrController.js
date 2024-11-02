// distrbtrController.js
const db = require('../config/db'); // Assuming you have a DB connection file
const axios = require('axios');

// Get all orders for a distributor by their ID
// Get all orders for a distributor by their ID, filtered by 'booked' status
exports.getDistributorOrders = async (req, res) => {
  const distributorId = req.params.distributorId;

  try {
    const query = `
      SELECT 
        Orders.order_id,
        Products.product_name,
        OrderDetails.quantity,
        Retailer.retailer_address,
        Distributor.distributor_name,
        Orders.order_status,
        Orders.order_date
      FROM 
        Orders
      JOIN 
        OrderDetails ON Orders.order_id = OrderDetails.order_id
      JOIN 
        Products ON OrderDetails.product_id = Products.product_id
      JOIN 
        Retailer ON Orders.retailer_id = Retailer.retailer_id
      JOIN 
        Distributor ON Orders.distributor_id = Distributor.distributor_id
      WHERE 
        Orders.distributor_id = ? AND Orders.order_status = 'Pending'
    `;

    const [orders] = await db.execute(query, [distributorId]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const query = `UPDATE Orders SET order_status = ? WHERE order_id = ?`;
    await db.execute(query, [status, orderId]);

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// Get distributor profile details
exports.getDistributorProfile = async (req, res) => {
  const distributorId = req.params.distributorId;

  try {
    const query = `SELECT * FROM Distributor WHERE distributor_id = ?`;
    const [distributor] = await db.execute(query, [distributorId]);

    if (distributor.length > 0) {
      res.status(200).json(distributor[0]);
    } else {
      res.status(404).json({ message: 'Distributor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving distributor profile', error });
  }
};
