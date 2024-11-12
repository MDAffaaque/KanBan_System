import React from 'react';
import './TicketCard.css';

function TicketCard({ ticket }) {
  const priorityColors = ['gray', 'blue', 'yellow', 'orange', 'red'];
  return (
    <div className="ticket-card" style={{ borderLeft: `4px solid ${priorityColors[ticket.priority]}` }}>
      <h4>{ticket.title}</h4>
      <p>Status: {ticket.status}</p>
      <p>User: {ticket.user}</p>
      <p>Priority: {['No priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority]}</p>
    </div>
  );
}

export default TicketCard;
