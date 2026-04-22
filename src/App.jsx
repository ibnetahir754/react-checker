import { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = 'http://52.221.252.57:3001';

function App() {
  const [health, setHealth] = useState(null);
  const [data, setData] = useState(null);
  const [reports, setReports] = useState(null);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [h, d, r] = await Promise.all([
        fetch(`${API_BASE_URL}/health`).then(res => res.json()),
        fetch(`${API_BASE_URL}/data`).then(res => res.json()),
        fetch(`${API_BASE_URL}/reports`).then(res => res.json())
      ]);

      setHealth(h);
      setData(d);
      setReports(r);
      setError('');
    } catch (err) {
      setError('Failed to fetch backend data');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="page">
      <h1>React Checker</h1>
      <p><strong>API Base URL:</strong> {API_BASE_URL}</p>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <h2>Health</h2>
        <pre>{JSON.stringify(health, null, 2)}</pre>
      </div>

      <div className="card">
        <h2>Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="card">
        <h2>Reports</h2>
        <pre>{JSON.stringify(reports, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;