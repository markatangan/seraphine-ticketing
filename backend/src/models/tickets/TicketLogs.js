const mongoose = require('mongoose');

const ticketLogsSchema = new mongoose.Schema({
    ticketId: String,
    actions: String,
    dateCreated: Date
});

const TicketLogs = mongoose.model('TicketLogs', ticketLogsSchema);

module.exports = TicketLogs;
