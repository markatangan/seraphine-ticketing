const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: String,
  priority: String,
  replicationSteps: String,
  investigationResult: String,
  solution: String,
  assignedTo: String,
  tags: [{ type: mongoose.Schema.Types.Array}],
  dateCreated:  { type: Date, default: Date.now},
  dateRaised: {type: Date},
  reportedBy: String,

});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
