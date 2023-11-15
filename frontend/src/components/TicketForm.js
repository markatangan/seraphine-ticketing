// frontend/src/components/TicketForm.js
import React, { useState, useEffect } from 'react';
import apiService from '../apiService';
import './TicketStyles.css'; // Import shared styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function TicketForm() {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
    selectedTags: [], // Initialize as an empty array
    dateRaised: '', // Add dateRaised field
    email: '', // Add email field
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    // Fetch categories and tags using the API service
    apiService.getCategories()
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    apiService.getTags()
      .then(response => {
        setTags(response.data);
        setAvailableTags(response.data.map(tag => tag.description));
      })
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleTagSelect = (selectedTag) => {
    setTicket(prevState => ({
      ...prevState,
      selectedTags: [...prevState.selectedTags, selectedTag],
    }));
    setAvailableTags(availableTags.filter(tag => tag !== selectedTag));
  };

  const handleTagRemove = (removedTag) => {
    setTicket(prevState => ({
      ...prevState,
      selectedTags: prevState.selectedTags.filter(tag => tag !== removedTag),
    }));
    setAvailableTags([...availableTags, removedTag]);
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

  const isEmailValid = (email) => {
    // Simple email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="container mt-5">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={ticket.reportedBy}
            className="form-control"
            required
          />
        </div>

        {/* Dropdown for Categories */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={ticket.category}
            required
            className="form-select"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.description}>
                {category.description}
              </option>
            ))}
          </select>
        </div>

        {/* Concern Field */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Concern:</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={ticket.title}
            className="form-control"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={ticket.description}
            className="form-control"
            required
          ></textarea>
        </div>



        {/* Multi-Select Dropdown for Tags */}
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags:</label>
          <select
            name="tags"
            id="tags"
            onChange={(e) => handleTagSelect(e.target.value)}
            value=""
            className="form-select mb-2"
          >
            <option value="" disabled>Select tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {ticket.selectedTags.length > 0 && (
            <div className="mt-2">
              <label>Selected Tags:</label>
              <div className="d-flex flex-wrap">
                {ticket.selectedTags.map((selectedTag) => (
                  <div key={selectedTag} className="badge bg-secondary me-2 mb-2">
                    {selectedTag}
                    <button type="button" className="btn-close" onClick={() => handleTagRemove(selectedTag)}></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Raised */}
        <div className="mb-3">
          <label htmlFor="dateRaised" className="form-label">Date Raised:</label>
          <input
            type="date"
            name="dateRaised"
            onChange={handleChange}
            value={ticket.dateRaised}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default TicketForm;
