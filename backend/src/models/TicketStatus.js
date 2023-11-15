const mongoose = require('mongoose');

const ticketStatusSchema = new mongoose.Schema({
    statusId: Number,
    statusCode: String,
    description: String,
});

const ticketStatus = mongoose.model('ticketStatus', ticketStatusSchema);

module.exports = ticketStatus;
