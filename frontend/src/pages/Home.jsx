import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {}
      <header className="home-header">
        <div className="home-logo-box">
        <Link to="/" className="home-logo">
          StickIt
        </Link>
        </div>
        <Link to="/login" className="home-login-button">
          Login
        </Link>
      </header>

      {}
      <div className="home-main-content">
        <div className="productive-box">
          <h2>Be more productive</h2>
          <p>
            Never forget another task with StickIt. Seamlessly create notes and
            reminders anytime, anywhere.
          </p>
          {}
        </div>
      </div>
    </div>
  );
}

export default Home;