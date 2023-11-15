// routes/tickets.js

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const TicketController = require('../controller/Ticket');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new ticket
router.post('/', async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newTicket = await TicketController.CreateTicket({title, description, category})
    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing ticket
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
