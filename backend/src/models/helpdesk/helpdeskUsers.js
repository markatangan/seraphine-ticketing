const mongoose = require('mongoose');

const helpdeskUserSchema = new mongoose.Schema({
  userName: String,
  userType: String,
  userEmail: String,
});

const HelpdeskUsers = mongoose.model('helpdeskUsers', helpdeskUserSchema);

module.exports = HelpdeskUsers;


