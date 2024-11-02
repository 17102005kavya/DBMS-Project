const db = require('../config/db'); // Ensure you import your database connection

// In-memory session store (for demo purposes)
const sessions = {}; // Key: userId, Value: { role, timestamp }

// Function to handle login
const login = async (req, res) => {
    const { userId, role } = req.body; // No need for password

    // Validate input
    if (!userId || !role) {
        return res.status(400).json({ message: 'User ID and role are required' });
    }
    
    console.log("Reached in the backend");

    // Ensure the role is valid to prevent SQL injection
    const validRoles = ['supplier', 'distributor', 'retailer','admin'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Store userId and role in the sessions object
    sessions[userId] = { role, timestamp: new Date() };
    
    console.log(`User ID: ${userId}, Role: ${role}`);

    // Redirect based on role
    let redirectPath;
    switch (role) {
        case 'supplier':
            redirectPath = '/api/supplier/dashboard'; // Redirect path for suppliers
            break;
        case 'distributor':
            redirectPath = '/api/distributor/dashboard'; // Redirect path for distributors
            break;
        case 'retailer':
            redirectPath = '/api/retailer/dashboard'; // Redirect path for retailers
            break;
        case 'admin':
            redirectPath = '/api/admin/dashboard'; 
            break;
        default:
            return res.status(400).json({ message: 'Role not implemented' });
    }

    return res.status(200).json({ 
        message: 'Login successful', 
        redirectTo: redirectPath,
        userId: userId, // Optional: Send back the user ID if needed
        role: role // Optional: Send back the role if needed
    });
};

// Function to retrieve user session (for example, to check if logged in)
const getSession = (req, res) => {
    const { userId } = req.body; // Get user ID from the request body

    if (sessions[userId]) {
        return res.status(200).json({ 
            message: 'Session retrieved successfully', 
            session: sessions[userId] 
        });
    } else {
        return res.status(404).json({ message: 'Session not found' });
    }
};

// Function to handle logout
const logout = (req, res) => {
    const { userId } = req.body; // Get user ID from the request body

    if (sessions[userId]) {
        delete sessions[userId]; // Remove the session
        return res.status(200).json({ message: 'Logout successful' });
    } else {
        return res.status(404).json({ message: 'Session not found' });
    }
};

module.exports = { login, getSession, logout };
