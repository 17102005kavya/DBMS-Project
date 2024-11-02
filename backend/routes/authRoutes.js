const express = require('express');
const router = express.Router();
const { login, getSession, logout } = require('../controllers/authController');

// Route for logging in
router.post('/login', login);

// Route for retrieving user session
router.post('/session', getSession);

// Route for logging out
router.post('/logout', logout);

module.exports = router;
