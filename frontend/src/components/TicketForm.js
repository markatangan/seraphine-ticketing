// frontend/src/components/TicketForm.js
import React, { useState } from 'react';
import axios from 'axios';

function TicketForm() {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/tickets', ticket);
      console.log(response.data); // handle success
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleChange} required />
        <label>Description:</label>
        <textarea name="description" onChange={handleChange} required></textarea>
        <label>Category:</label>
        <input type="text" name="category" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketForm;
