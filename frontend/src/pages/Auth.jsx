import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; 

function Auth() {
  const [isRegister, setIsRegister] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const clearForms = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          username,
          password,
        });
        console.log('Registered successfully!', res.data);
        alert('Registration successful! Please sign in.');
        setIsRegister(false); 
        clearForms(); 
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
        });
        console.log('Login successful!', res.data);
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard'); 
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An unknown error occurred';
      console.error('Authentication error:', errorMsg);
      alert('Error: ' + errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {}
        <Link to="/" className="auth-logo">StickIt</Link>
        <p className="auth-tagline">Access your interactive sticky note platform</p>

        {}
        <div className="auth-tabs">
          <button
            className={`auth-tab-button ${!isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(false);
              clearForms();
            }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab-button ${isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(true);
              clearForms();
            }}
          >
            Sign Up
          </button>
        </div>

        {}
        <div className="auth-form-area">
          {isRegister ? (
            
            <>
              <h3 className="form-title">Create your account</h3>
              <p className="form-subtitle">Enter your details to get started with StickIt</p>
              <form onSubmit={handleAuth} className="auth-form">
                <div className="form-group">
                  <label htmlFor="regUsername">Username</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i> {}
                    <input
                      type="text"
                      id="regUsername"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="regPassword">Password</label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock"></i> {}
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="regPassword"
                      placeholder="Create a password, minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                    />
                    <i 
                      className={`toggle-password fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock"></i> {}
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <i
                      className={`toggle-password fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                  </div>
                </div>
                <button type="submit" className="auth-submit-button register">
                  Create Account
                </button>
              </form>
            </>
          ) : (
       
            <>
              <h3 className="form-title">Welcome back</h3>
              <p className="form-subtitle">Enter your credentials to access your account</p>
              <form onSubmit={handleAuth} className="auth-form">
                <div className="form-group">
                  <label htmlFor="loginUsername">Username</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i> {}
                    <input
                      type="text"
                      id="loginUsername"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">Password</label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock"></i> {}
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="loginPassword"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <i
                      className={`toggle-password fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                </div>
                <button type="submit" className="auth-submit-button login">
                  Sign In
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;