// frontend/src/components/TicketDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

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
    <div>
      <h2>Ticket Details</h2>
      <p>Title: {ticket.title}</p>
      <p>Description: {ticket.description}</p>
      <p>Category: {ticket.category}</p>
      <p>Status: {ticket.status}</p>
      <p>Replication Steps: {ticket.replicationSteps}</p>
      <p>Investigation Result: {ticket.investigationResult}</p>
      <p>Solution: {ticket.solution}</p>
      <p>Assigned To: {ticket.assignedTo}</p>
      <Link to={`/update/${id}`}>Update Ticket</Link>
    </div>
  );
}

export default TicketDetail;
