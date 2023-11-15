// frontend/src/components/TicketList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './TicketStyles.css'; // Import shared styles


const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch tickets from your backend API
    fetch('http://localhost:3001/api/tickets')
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const title = ticket.title || '';
    const description = ticket.description || '';
    const category = ticket.category || '';
    const status = ticket.status || '';

    return (
      title.toLowerCase().includes(filter.toLowerCase()) ||
      description.toLowerCase().includes(filter.toLowerCase()) ||
      category.toLowerCase().includes(filter.toLowerCase()) ||
      status.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className="ticket-list">
      <h2>Ticket List</h2>
      <Link to="/create" className="btn btn-primary">Create New Ticket</Link>
      <input
        type="text"
        placeholder="Filter by title, description, or category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mt-3"
      />
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.category}</td>
              <td>{ticket.status}</td>
              <td>
                <Link to={`/ticket/${ticket._id}`} className="btn btn-info btn-sm">View</Link>{' '}
                <Link to={`/update/${ticket._id}`} className="btn btn-warning btn-sm">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
