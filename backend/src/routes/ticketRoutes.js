const express = require('express');
const ticketController = require('../controller/TicketController');
const router = express.Router();

// Get all tickets
router.get('/', ticketController.getAllTickets);
router.get('/category/', ticketController.getAllTicketCategory);

// Get all tickets
router.get('/:id', ticketController.getTicketById);

// Create a new ticket
router.post('/', ticketController.createTicket);
// Create a new ticket
router.post('/category/', ticketController.createTicketCategory);

// Update an existing ticket
router.patch('/:id', ticketController.updateTicket);

// Delete an existing ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
