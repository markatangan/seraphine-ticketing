const mongoose = require('mongoose');

const ticketPrioritySchema = new mongoose.Schema({
    ticketPriorityId: String,
    ticketPriorityCode: String,
    description: String
});

const TicketLogs = mongoose.model('ticketPriority', ticketPrioritySchema);

module.exports = TicketLogs;
