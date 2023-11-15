// frontend/src/components/TicketUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';  // Add this line
import apiService from '../apiService';


function TicketUpdate() {
  const { id } = useParams();
  const history = useHistory(); 
  const [ticket, setTicket] = useState({
    status: '',
    replicationSteps: '',
    investigationResult: '',
    solution: '',
    assignedTo: '',
    category: '', 
    status: '', 
    priority: '',
    assignee: '',
    tags: [],  // Initialize tags and selectedTags as empty arrays
    selectedTags: [],
  });

  const [categories, setCategories] = useState([]);
  const [statuses, setStatus] = useState([]);
  const [priorities, setPriority] = useState([]); 
  const [assignees, setAssignee] = useState([]); 
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleTagSelect = (selectedTag) => {
    setTicket(prevState => ({
      ...prevState,
      tags: [...prevState.tags, selectedTag], 
 
    }));
    setAvailableTags(availableTags.filter(tag => tag !== selectedTag));
  };

  const handleTagRemove = (removedTag) => {
    setTicket(prevState => ({
      ...prevState,
      tags: prevState.tags.filter(tag => tag !== removedTag),
      selectedTags: prevState.tags.filter(tag => tag !== removedTag),  // Remove the tag from tags array
    }));
    setAvailableTags([...availableTags, removedTag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.updateTicket(id, ticket);
      console.log(response.data); // handle success

      // Redirect to TicketList.js after successful submission
      history.push('/'); // Replace '/ticket-list' with the actual path you want to redirect to
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await apiService.getTicket(id);
        setTicket(response.data); // handle success

        const categoriesResponse = await apiService.getCategories();
        setCategories(categoriesResponse.data);

        const statusResponse = await apiService.getStatuses();
        setStatus(statusResponse.data);

        const priorityResponse = await apiService.getPriorites();
        setPriority(priorityResponse.data);

        const assgineeResponse = await apiService.getAssignees();
        setAssignee(assgineeResponse.data);

        const tagsResponse = await apiService.getTags();
        setTags(tagsResponse.data);
        setAvailableTags(tagsResponse.data.map(tag => tag.description));

      } catch (error) {
        console.error('Error fetching ticket details for update:', error);
      }
    };

    fetchTicket();
  }, [id]);


  return (
    <div className="container mt-5">
      <h2>Update Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Issue Title:</label>
          <textarea name="title" onChange={handleChange} value={ticket.title} className="form-control"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea name="description" onChange={handleChange} value={ticket.description} className="form-control"></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            name="category"
            onChange={handleChange}
            value={ticket.category}
            className="form-select"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.description}>
                {category.description}
              </option>
            ))}
          </select>
        </div>

        {/* Priorities Dropdown */}
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority:</label>
          <select
            name="priority"
            onChange={handleChange}
            value={ticket.priority}
            className="form-select"
          >
            <option value="">Select priority</option>
            {priorities.map((priority) => (
              <option key={priority.ticketPriorityId} value={priority.description}>
                {priority.description}
              </option>
            ))}
          </select>
        </div>

        {/* Assignee Dropdown */}
        <div className="mb-3">
          <label htmlFor="assignee" className="form-label">Assignee:</label>
          <select
            name="assignedTo"
            onChange={handleChange}
            value={ticket.assignedTo}
            className="form-select"
          >
            <option value="">Select Assignee</option>
            {assignees.map((assignee) => (
              <option key={assignee.userName} value={assignee.userEmail}>
                {assignee.userEmail}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <select
            name="status"
            onChange={handleChange}
            value={ticket.status}
            className="form-select"
          >
            <option value="">Select status</option>
            {statuses.map((status) => (
              <option key={status.statusId} value={status.description}>
                {status.description}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Multi-Select Dropdown */}
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags:</label>
          <select
            id="tags"
            name="tags"
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
          {ticket.tags.length > 0 && (
            <div className="mt-2">
              <label>Selected Tags:</label>
              <div className="d-flex flex-wrap">
                {ticket.tags.map((selectedTag) => (
                  <div key={selectedTag} className="badge bg-secondary me-2 mb-2">
                    {selectedTag}
                    <button type="button" className="btn-close" onClick={() => handleTagRemove(selectedTag)}></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        

        <div className="mb-3">
          <label htmlFor="replicationSteps" className="form-label">Replication Steps:</label>
          <textarea name="replicationSteps" onChange={handleChange} value={ticket.replicationSteps} className="form-control"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="investigationResult" className="form-label">Investigation Result:</label>
          <textarea name="investigationResult" onChange={handleChange} value={ticket.investigationResult} className="form-control"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="solution" className="form-label">Solution:</label>
          <textarea name="solution" onChange={handleChange} value={ticket.solution} className="form-control"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default TicketUpdate;
