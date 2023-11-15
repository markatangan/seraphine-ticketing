const express = require('express');
const ticketController = require('../controller/TicketController');
const router = express.Router();

// Get all tickets
router.get('/', ticketController.getAllTickets);

// Create a new ticket
router.post('/', ticketController.createTicket);

// Update an existing ticket
router.patch('/:id', ticketController.updateTicket);

// Delete an existing ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
