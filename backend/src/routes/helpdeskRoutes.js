const express = require('express');
const helpdeskController = require('../controller/HelpdeskController');
const router = express.Router();

// Get all tickets
router.get('/users', helpdeskController.getAllUsers);
router.post('/users', helpdeskController.createUser);

module.exports = router;
