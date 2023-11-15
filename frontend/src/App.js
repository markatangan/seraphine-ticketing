// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import TicketForm from './components/TicketForm';
import TicketUpdate from './components/TicketUpdate';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={TicketList} />
          <Route path="/ticket/:id" component={TicketDetail} />
          <Route path="/create" component={TicketForm} />
          <Route path="/update/:id" component={TicketUpdate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
