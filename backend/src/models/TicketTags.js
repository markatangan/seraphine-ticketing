const mongoose = require('mongoose');

const ticketTagsSchema = new mongoose.Schema({
    tagsId: Number,
    tagsCode: String,
    description: String,
});

const ticketTags = mongoose.model('ticketTags', ticketTagsSchema);

module.exports = ticketTags;
