import React, { useEffect, useState } from 'react';

const apiUrl = "http://3.110.224.8:5050/record"; // Replace with your EC2 URL

const Record = ({ id }) => {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          setRecord(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { name: record.name, position: record.position, level: record.level };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log('Record created:', data);
        // Optionally redirect or update UI
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={record.name || ''}
        onChange={(e) => setRecord({ ...record, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={record.position || ''}
        onChange={(e) => setRecord({ ...record, position: e.target.value })}
        placeholder="Position"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Record;
