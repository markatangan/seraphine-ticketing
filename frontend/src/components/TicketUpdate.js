// frontend/src/components/TicketUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TicketUpdate() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    status: '',
    replicationSteps: '',
    investigationResult: '',
    solution: '',
    assignedTo: '',
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/tickets/${id}`, ticket);
      console.log(response.data); // handle success
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tickets/${id}`);
        setTicket(response.data); // handle success
      } catch (error) {
        console.error('Error fetching ticket details for update:', error);
      }
    };

    fetchTicket();
  }, [id]);

  return (
    <div>
      <h2>Update Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Status:</label>
        <input type="text" name="status" onChange={handleChange} value={ticket.status} />
        <label>Replication Steps:</label>
        <textarea name="replicationSteps" onChange={handleChange} value={ticket.replicationSteps}></textarea>
        <label>Investigation Result:</label>
        <textarea name="investigationResult" onChange={handleChange} value={ticket.investigationResult}></textarea>
        <label>Solution:</label>
        <textarea name="solution" onChange={handleChange} value={ticket.solution}></textarea>
        <label>Assigned To:</label>
        <input type="text" name="assignedTo" onChange={handleChange} value={ticket.assignedTo} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default TicketUpdate;
