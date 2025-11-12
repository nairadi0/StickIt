import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: username,
        password: password,
      });

      console.log('Login successful!', res.data);
      
      
      
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
      

    } catch (err) {
      console.error('Login error:', err.response.data.msg);
      alert('Error: ' + err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Login to StickIt</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;