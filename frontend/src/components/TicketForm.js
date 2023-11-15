// frontend/src/components/TicketForm.js
import React, { useState, useEffect } from 'react';
import apiService from '../apiService'; // Adjust the import path based on your project structure
import './TicketStyles.css'; // Import shared styles

function TicketForm() {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories using the API service
    apiService.getCategories()
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createTicket(ticket);
      console.log(response.data); // handle success
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="ticket-container">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleChange} required className="form-control" />
        <label>Description:</label>
        <textarea name="description" onChange={handleChange} required className="form-control"></textarea>
        
        {/* Dropdown for Categories */}
        <label>Category:</label>
        <select name="category" onChange={handleChange} required className="form-control">
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryCode}>
              {category.description}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default TicketForm;
