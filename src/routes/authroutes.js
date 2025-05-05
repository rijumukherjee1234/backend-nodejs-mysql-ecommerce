const express = require('express');
const { login } = require('../controllers/auth'); // Import controller
const router = express.Router();

// Login route
router.post('/api-post-admin-login', login);

module.exports = router;
