// frontend/src/apiService.js

import axios from 'axios';

const apiService = {
  getCategories: () => axios.get('http://localhost:3001/api/tickets/category'),
  getPriorites: () => axios.get('http://localhost:3001/api/tickets/priority'),
  getStatuses: () => axios.get('http://localhost:3001/api/tickets/status'),
  createTicket: (ticketData) => axios.post('http://localhost:3001/api/tickets', ticketData),
  getStatus: () => axios.get('http://localhost:3001/api/tickets/status'),
  getTags: () => axios.get('http://localhost:3001/api/tickets/tags'),
  getAssignees: () => axios.get('http://localhost:3001/helpdesk/users'),
  getTicket: (id) => axios.get(`http://localhost:3001/api/tickets/${id}`),
  updateTicket: (id, ticketData) => axios.patch(`http://localhost:3001/api/tickets/${id}`, ticketData),
  sendSlackNotification: (ticketData) => axios.post('http://localhost:3001/api/tickets/slack', ticketData),
  // Add other API functions as needed
};

export default apiService;
