// frontend/src/components/TicketList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TicketStyles.css'; // Import shared styles

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Fetch tickets from your backend API
    fetch('http://localhost:3001/api/tickets')
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  const handleTagToggle = (tag) => {
    // Toggle the selected tag
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const applySidebarFilters = () => {
    // Apply filters based on selected tags, category, and status
    let filteredTickets = [...tickets];

    if (selectedTags.length > 0) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.tags.some((tag) => selectedTags.includes(tag[0]))
      );
    }

    if (selectedCategory) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedStatus) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    return filteredTickets;
  };

  const applySearchFilter = (ticket) => {
    // Apply search filter
    const { title, description, category, status, tags } = ticket;
    return (
      title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      status.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tags.some((tag) => tag[0].toLowerCase().includes(searchFilter.toLowerCase())) ||
      (tags.length === 0 && searchFilter.toLowerCase() === 'n/a')
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory('');
    setSelectedStatus('');
    setSearchFilter('');
  };

  const uniqueCategories = Array.from(new Set(tickets.map((ticket) => ticket.category)));
  const uniqueStatuses = Array.from(new Set(tickets.map((ticket) => ticket.status)));
  const uniqueTags = Array.from(new Set(tickets.flatMap((ticket) => ticket.tags.map((tag) => tag[0]))));

  const filteredTickets = applySidebarFilters().filter(applySearchFilter);

  return (
    <div className="ticket-list">
      <div className="sidebar">
        <h4>Filter by Tags</h4>
        <select
          onChange={(e) => setSelectedTags([e.target.value])}
          value={selectedTags[0] || ''}
          className="form-select mb-2"
        >
          <option value="">Select tag</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <h4>Filter by Category</h4>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="form-select mb-2"
        >
          <option value="">Select category</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <h4>Filter by Status</h4>
        <select
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
          className="form-select mb-2"
        >
          <option value="">Select status</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button className="btn btn-secondary mt-2" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      <div className="main-content">
        <h2>Ticket List</h2>
        <Link to="/create" className="btn btn-primary">
          Create New Ticket
        </Link>
        <input
          type="text"
          placeholder="Search..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="form-control mt-3"
        />
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Ticket Name</th>
              <th>Date Raised</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Reported By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket._id}</td>
                <td>{ticket.title}</td>
                <td>{new Date(ticket.dateRaised).toLocaleDateString()}</td>
                <td>{ticket.priority || "N/A"}</td>
                <td>{ticket.category}</td>
                <td>{ticket.tags.length > 0 ? ticket.tags.map((tag) => tag[0]).join(', ') : 'N/A'}</td>
                <td>{ticket.status}</td>
                <td>{ticket.reportedBy}</td>
                <td>
                  <Link to={`/ticket/${ticket._id}`} className="btn btn-info btn-sm">
                    View
                  </Link>{' '}
                  <Link to={`/update/${ticket._id}`} className="btn btn-warning btn-sm">
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;
