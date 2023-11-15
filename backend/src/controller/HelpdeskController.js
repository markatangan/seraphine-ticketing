const HelpdeskUsers = require('../models/helpdesk/helpdeskUsers');

const helpdeskController = {
    getAllUsers: async (req, res) => {
    try {
      const helpdeskUsers = await HelpdeskUsers.find();
      res.json(helpdeskUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createUser: async (req, res) => {
    const { userName, userType, userEmail } = req.body;
    // Validation
    if (!userName || !userType || !userEmail) {
      return res.status(400).json({ error: 'user, userType, email are required' });
    }

    try {
      const newUser = await HelpdeskUsers.create({userName, userType, userEmail});
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}
module.exports = helpdeskController;
