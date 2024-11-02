require('dotenv').config();  // Load environment variables
require('express-async-errors'); // Handle async errors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const supplierRoutes = require('./routes/supplierRoutes');  // Supplier routes
const distributorRoutes = require('./routes/distrbtrRoutes');  // Distributor routes
const retailerRoutes = require('./routes/retailerRoutes');  // Retailer routes
const adminRoutes = require('./routes/adminRoutes');  // Admin routes
const authRoutes = require('./routes/authRoutes');  // Authentication routes
const pool = require('./config/db');  // Database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Test
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Database connected successfully!");
        connection.release();
    }
});

// Routes
app.use('/api/auth', authRoutes);           // Authentication-related routes
app.use('/supplier', supplierRoutes);       // Supplier-related routes
app.use('/distributor', distributorRoutes); // Distributor-related routes
app.use('/retailer', retailerRoutes);       // Retailer-related routes
app.use('/admin', adminRoutes);             // Admin-related routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An internal server error occurred' });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// At the end of all routes, add this fallback:
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // Adjust the path to your frontend build folder
  });
  
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
