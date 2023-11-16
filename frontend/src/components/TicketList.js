import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
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

  const paginationOptions = {
    sizePerPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '20', value: 20 },
      { text: 'All', value: filteredTickets.length },
    ],
  };

  const columns = [
    { dataField: '_id', text: 'Ticket ID' },
    { dataField: 'title', text: 'Ticket Name' },
    { dataField: 'dateRaised', text: 'Date Raised', formatter: dateFormatter },
    { dataField: 'priority', text: 'Priority' },
    { dataField: 'category', text: 'Category' },
    { dataField: 'tags', text: 'Tags', formatter: tagsFormatter },
    { dataField: 'status', text: 'Status' },
    { dataField: 'reportedBy', text: 'Reported By' },
    { dataField: '_id', text: 'Actions', formatter: actionsFormatter },
  ];

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
        <BootstrapTable
          keyField="_id"
          data={filteredTickets}
          columns={columns}
          pagination={paginationFactory(paginationOptions)}
        />
      </div>
    </div>
  );
};

export default TicketList;

// Helper functions
function dateFormatter(cell) {
  return new Date(cell).toLocaleDateString();
}

function tagsFormatter(cell) {
  return cell.length > 0 ? cell.map((tag) => tag[0]).join(', ') : 'N/A';
}

function actionsFormatter(cell, row) {
  return (
    <>
      <Link to={`/ticket/${row._id}`} className="btn btn-info btn-sm">
        View
      </Link>{' '}
      <Link to={`/update/${row._id}`} className="btn btn-warning btn-sm">
        Update
      </Link>
    </>
  );
}
