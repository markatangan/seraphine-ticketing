// frontend/src/apiService.js

import axios from 'axios';

const apiService = {
  getCategories: () => axios.get('http://localhost:3001/api/tickets/category'),
  createTicket: (ticketData) => axios.post('http://localhost:3001/api/tickets', ticketData),
  // Add other API functions as needed
};

export default apiService;
