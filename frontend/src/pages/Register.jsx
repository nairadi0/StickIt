import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: username,
        password: password,
      });

      console.log('Registered successfully!', res.data);
     
      
      
      alert('Registration successful! Please log in.');
      navigate('/login');

    } catch (err) {
      console.error('Registration error:', err.response.data.msg);
      alert('Error: ' + err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Register for StickIt</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;