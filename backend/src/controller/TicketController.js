const Ticket = require('../models/Ticket');
const TicketLogs = require('../models/TicketLogs')
const TicketCategory = require('../models/TicketCategory')
const TicketStatus = require('../models/TicketStatus')
const TicketTags = require('../models/TicketTags')
const TicketPriority = require('../models/TicketPriority')

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

  getAllTicketCategory: async (req, res) => {
    try {
      const tickets = await TicketCategory.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTicketPriority: async (req, res) => {
    try {
      const tickets = await TicketPriority.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTicketStatus: async (req, res) => {
    try {
      const status = await TicketStatus.find();
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTicketTags: async (req, res) => {
    try {
      const tags = await TicketTags.find();
      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTicketById: async (req, res) => {
    const { id } = req.params;
    try {
      const tickets = await Ticket.findById(id);
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTicket: async (req, res) => {
    const { title, description, category, selectedTags, dateRaised } = req.body;  
    
    // Validation
    if (!title || !description || !category || !dateRaised) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }
  
    const params = {
      title,
      description,
      category,
      dateRaised,
      tags: selectedTags,
      priority: '',
      status: "Open"
    }
    try {
      // Create the ticket
      const newTicket = await Ticket.create(params);

      // Respond with the newly created ticket
      res.status(201).json(newTicket);
  
      // Log the ticket creation
      const ticketLogsParams = {
        ticketId: newTicket._id,
        actions: 'Create',
        dateCreated: new Date(),
      };
  
      await TicketLogs.create(ticketLogsParams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTicketCategory: async (req, res) => {
    const { categoryCode, description, categoryId } = req.body;

    // Validation
    if (!categoryCode || !description || !categoryId) {
      return res.status(400).json({ error: 'categoryCode, description, and categoryId are required' });
    }

    try {
      var createParams = {
        categoryCode: categoryCode,
        description: description,
        categoryId: categoryId
      }
      const newCategory = await TicketCategory.create(createParams);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTicketPriority: async (req, res) => {
    const { ticketPriorityCode, description, ticketPriorityId } = req.body;

    // Validation
    if (!ticketPriorityCode || !description || !ticketPriorityId) {
      return res.status(400).json({ error: 'ticketPriorityCode, description, and ticketPriorityId are required' });
    }

    try {
      var createParams = {
        ticketPriorityCode: ticketPriorityCode,
        description: description,
        ticketPriorityId: ticketPriorityId
      }
      const newPriority = await TicketPriority.create(createParams);
      res.status(201).json(newPriority);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTicketStatus: async (req, res) => {
    const { statusCode, description, statusId } = req.body;

    // Validation
    if (!statusCode || !description || !statusId) {
      return res.status(400).json({ error: 'statusCode, description, and statusId are required' });
    }

    try {
      var statusParams = {
        statusCode: statusCode,
        description: description,
        statusId: statusId
      }
      const newStatus = await TicketStatus.create(statusParams);
      res.status(201).json(newStatus);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTicketTags: async (req, res) => {
    const { tagsCode, description, tagsId } = req.body;

    // Validation
    if (!tagsCode || !description || !tagsId) {
      return res.status(400).json({ error: 'tagsCode, description, and tagsId are required' });
    }

    try {
      var tagsParams = {
        tagsCode: tagsCode,
        description: description,
        tagsId: tagsId
      }
      const newTags = await TicketTags.create(tagsParams);
      res.status(201).json(newTags);

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

      var ticketLogsParams = {
        ticketId: updatedTicket._id,
        actions: 'Update',
        dateCreated: new Date()
      }

      await TicketLogs.create(ticketLogsParams);
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
