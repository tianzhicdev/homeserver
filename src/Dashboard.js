import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [latestBlock, setLatestBlock] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBlock = async () => {
      try {
        const response = await fetch('http://marcus-mini.is-very-nice.org:3001/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: 'SELECT block_number, timestamp, created_at FROM transactions ORDER BY timestamp DESC LIMIT 1',
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setLatestBlock(data[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLatestBlock();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!latestBlock) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Latest Block</h2>
      <p>Block Number: {latestBlock.block_number}</p>
      <p>Timestamp: {new Date(latestBlock.timestamp).toLocaleString()}</p>
      <p>Create At: {new Date(latestBlock.created_at).toLocaleString()}</p>
    </div>
  );
};

export default Dashboard;
