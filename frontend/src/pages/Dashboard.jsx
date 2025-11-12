import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

function Dashboard() {
  const [tasks, setTasks] = useState([]); 
  const [text, setText] = useState('');     
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      if (err.response && err.response.status === 401) {
        handleLogout(); 
      }
    }
  };


  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; 

    try {
      const res = await api.post('/tasks', { text });
      
      setTasks([res.data, ...tasks]);
      setText(''); 
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome to Your StickIt Dashboard!</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      {}
      <form onSubmit={handleCreateTask}>
        <h3>Create a new StickIt Note</h3>
        <input
          type="text"
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      {}
      <div className="task-list">
        <h3>Your Notes</h3>
        {tasks.length === 0 ? (
          <p>You have no notes yet. Create one!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
              <p>{task.text}</p>
              <small>Created at: {new Date(task.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;