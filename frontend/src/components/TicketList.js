// frontend/src/components/TicketList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tickets');
        setTickets(response.data); // handle success
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <Link to={`/ticket/${ticket._id}`}>
              {ticket.title} - {ticket.category}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Create Ticket</Link>
    </div>
  );
}

export default TicketList;
