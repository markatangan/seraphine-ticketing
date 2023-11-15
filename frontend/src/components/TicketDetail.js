// frontend/src/components/TicketDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './TicketStyles.css'; // Import shared styles

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tickets/${id}`);
        setTicket(response.data); // handle success
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTicket();
  }, [id]);

  return (
    <div className="ticket-container">
      <div className="ticket-details">
        <h2>Ticket Details</h2>
        <p><strong>Title:</strong> {ticket.title}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Replication Steps:</strong> {ticket.replicationSteps}</p>
        <p><strong>Investigation Result:</strong> {ticket.investigationResult}</p>
        <p><strong>Solution:</strong> {ticket.solution}</p>
        <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
        <Link to={`/update/${id}`} className="btn btn-primary">Update Ticket</Link>
      </div>
    </div>
  );
}

export default TicketDetail;
