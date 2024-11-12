import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]); // Ensure tickets starts as an empty array
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        console.log(data);
        setTickets(data || []); // Set data or an empty array as fallback
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setTickets([]); // Set empty array on error to prevent undefined state
      }
    }
    fetchTickets();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="App">
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} setGroupBy={setGroupBy} setSortBy={setSortBy} />
    </div>
  );
}

export default App;
