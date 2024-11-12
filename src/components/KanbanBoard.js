import React from 'react';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';

function KanbanBoard({ tickets, groupBy, sortBy, setGroupBy, setSortBy }) {
  const groupTickets = (tickets) => {
    const grouped = {};
    tickets.forEach(ticket => {
      const groupKey = groupBy === 'status' ? ticket.status :
                       groupBy === 'user' ? ticket.user :
                       ticket.priority;
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(ticket);
    });
    return grouped;
  };

  const sortedTickets = Array.isArray(tickets) ? tickets.slice().sort((a, b) => {
    if (sortBy === 'priority') return b.priority - a.priority;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  }) : []; // Fallback to empty array if tickets is not an array

  const groupedTickets = groupTickets(sortedTickets);

  return (
    <div className="kanban-board">
      <div className="filters">
        <label>
          Group by:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(group => (
          <KanbanColumn key={group} title={group} tickets={groupedTickets[group]} />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
