// routes/tickets.js

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create a new ticket

async function CreateTicket(data) {
    return newTicket = await Ticket.create({ title, description, category });
}
module.exports = router;
