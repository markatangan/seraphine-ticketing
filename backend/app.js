const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/support_ticketing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const ticketRoutes = require('./src/routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
