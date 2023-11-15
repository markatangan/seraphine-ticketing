const Ticket = require('../models/Ticket');

const ticketController = {
  getAllTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTicket: async (req, res) => {
    const { title, description, category } = req.body;

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }

    try {
      var createParams = {
        title: title,
        description: description,
        category: category
      }
      const newTicket = await Ticket.create(createParams);
      res.status(201).json(newTicket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTicket: async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    // Validation
    if (!id) {
      return res.status(400).json({ error: 'Ticket ID is required' });
    }

    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(updatedTicket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTicket: async (req, res) => {
    const { id } = req.params;

    // Validation
    if (!id) {
      return res.status(400).json({ error: 'Ticket ID is required' });
    }

    try {
      const deletedTicket = await Ticket.findByIdAndDelete(id);
      if (!deletedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(deletedTicket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = ticketController;
