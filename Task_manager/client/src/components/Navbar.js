import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Navbar.css';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">TASK MANAGER-DO WHAT YOU LIKE!</Link>
        <div className="navbar-links">
          {token ? (
            <>
              <Link to="/dashboard" className="navbar-link">DashBoard</Link>
              <Link to="/tasks" className="navbar-link">Tasks</Link>
              <button onClick={logout} className="navbar-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;