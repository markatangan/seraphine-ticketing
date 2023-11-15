const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: String,
  replicationSteps: String,
  investigationResult: String,
  solution: String,
  assignedTo: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
