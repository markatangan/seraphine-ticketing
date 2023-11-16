const axios = require('axios'); // Import Axios

const Ticket = require('../models/tickets/Ticket');
const TicketLogs = require('../models/tickets/TicketLogs');
const TicketCategory = require('../models/tickets/TicketCategory');
const TicketStatus = require('../models/tickets/TicketStatus')
const TicketTags = require('../models/tickets/TicketTags')
const TicketPriority = require('../models/tickets/TicketPriority')

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
    const { title, description, category, selectedTags, dateRaised, reportedBy } = req.body;  
    
    // Validation
    if (!title || !description || !category || !dateRaised || !reportedBy) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }
  
    const params = {
      title,
      description,
      category,
      dateRaised,
      tags: selectedTags,
      priority: '',
      status: "Open",
      reportedBy
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
  getRelatedTickets: async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch the main ticket to get its category and tags
      const mainTicket = await Ticket.findById(id);

      // Fetch related tickets based on category and tags
      const relatedTickets = await Ticket.find({
        category: mainTicket.category,
        tags: { $in: mainTicket.tags.map(tag => tag[0]) },
        _id: { $ne: mainTicket._id }, // Exclude the main ticket itself
      });

      res.json(relatedTickets);
    } catch (error) {
      console.error('Error fetching related tickets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  sendSlackNotification: async (req, res) => {
    const { title, description, category, reportedBy, dateRaised, _id } = req.body;

    // Construct the link
    const ticketLink = `http://localhost:3000/ticket/${_id}`;

    // Construct the message with a masked link using Slack syntax
    const message = `New Ticket Created:\nTitle: ${title}\nDescription: ${description}\nCategory: ${category}\nReported By: ${reportedBy}\nDate Raised: ${dateRaised}\n<${ticketLink}|Ticket Details>`;

    // Make a request to the Slack Webhook URL
    try {
      await axios.post('https://hooks.slack.com/services/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', { text: message });
      res.status(200).send('Slack notification sent successfully');
    } catch (error) {
      console.error('Error sending Slack notification:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = ticketController;
