const mongoose = require('mongoose');

const ticketCategorySchema = new mongoose.Schema({
  categoryId: Number,
  categoryCode: String,
  description: String,
});

const TicketCategory = mongoose.model('ticketCategory', ticketCategorySchema);

module.exports = TicketCategory;
