// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import TicketForm from './components/TicketForm';
import TicketUpdate from './components/TicketUpdate';
import './index.css';

function App() {
  return (
    <Router>
      <div className="navbar">
        <h1>Seraphine Helpdesk</h1>
      </div>
      <div className="content">
        <div className="sidebar">
          <Link to="/">Dashboard</Link>
          <Link to="/create">Create Ticket</Link>
        </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={TicketList} />
            <Route path="/ticket/:id" component={TicketDetail} />
            <Route path="/create" component={TicketForm} />
            <Route path="/update/:id" component={TicketUpdate} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
