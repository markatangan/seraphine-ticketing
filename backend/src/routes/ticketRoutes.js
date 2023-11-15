// backend/src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Define your routes here
router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();

    res.status(201).json({ success: true, message: 'Ticket created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Add more routes as needed

module.exports = router;
