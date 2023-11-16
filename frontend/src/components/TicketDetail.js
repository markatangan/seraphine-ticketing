import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './TicketStyles.css'; // Import shared styles

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [relatedTickets, setRelatedTickets] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tickets/${id}`);
        setTicket(response.data);

        // Fetch related tickets
        const relatedResponse = await axios.get(`http://localhost:3001/api/tickets`);
        setRelatedTickets(relatedResponse.data);
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

      {/* Display related tickets in a table */}
      {relatedTickets.length > 0 && (
        <div className="related-tickets">
          <h2>Related Tickets</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {relatedTickets.map(relatedTicket => (
                <tr key={relatedTicket._id}>
                  <td><a href={`/ticket/${relatedTicket._id}`} target="_blank" rel="noopener noreferrer">{relatedTicket.title}</a></td>
                  <td>{relatedTicket.description}</td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TicketDetail;
