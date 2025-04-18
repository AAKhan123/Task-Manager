import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const tasks = res.data;
        setStats({
          total: tasks.length,
          pending: tasks.filter((t) => t.status === 'pending').length,
          completed: tasks.filter((t) => t.status === 'completed').length,
        });
      } catch (err) {
        alert('Error fetching stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">DashBoard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card dashboard-card-total">
          <h3 className="dashboard-card-title">Total Tasks</h3>
          <p className="dashboard-card-value">{stats.total}</p>
        </div>
        <div className="dashboard-card dashboard-card-pending">
          <h3 className="dashboard-card-title">Pending Tasks</h3>
          <p className="dashboard-card-value">{stats.pending}</p>
        </div>
        <div className="dashboard-card dashboard-card-completed">
          <h3 className="dashboard-card-title">Completed Tasks</h3>
          <p className="dashboard-card-value">{stats.completed}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;