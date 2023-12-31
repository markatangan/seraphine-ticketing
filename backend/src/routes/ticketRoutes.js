const express = require('express');
const ticketController = require('../controller/TicketController');
const router = express.Router();

// Get all tickets
router.get('/', ticketController.getAllTickets);
// Get all categorie
router.get('/category/', ticketController.getAllTicketCategory);
// Get all priority
router.get('/priority/', ticketController.getAllTicketPriority);
// Get all status
router.get('/status/', ticketController.getAllTicketStatus);
// Get all tags
router.get('/tags/', ticketController.getAllTicketTags);
// Get ticket by id
router.get('/:id', ticketController.getTicketById);
// Create a new ticket
router.post('/', ticketController.createTicket);
// Create a new Categories
router.post('/category/', ticketController.createTicketCategory);
// Create a new Priority
router.post('/priority/', ticketController.createTicketPriority);
// Create a new Status
router.post('/status/', ticketController.createTicketStatus);
// Create a new Tags
router.post('/tags/', ticketController.createTicketTags);
// Update an existing ticket
router.patch('/:id', ticketController.updateTicket);
// Delete an existing ticket
router.delete('/:id', ticketController.deleteTicket);

router.get('/related/:id', ticketController.getRelatedTickets);
router.post('/slack', ticketController.sendSlackNotification);


module.exports = router;
