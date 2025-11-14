import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Dashboard.css'; 

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId)); 
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task._id);
    setEditingText(task.text);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleUpdateTask = async (taskId) => {
    if (!editingText.trim()) return;
    try {
      const res = await api.put(`/tasks/${taskId}`, { text: editingText });
      setTasks(
        tasks.map((task) => (task._id === taskId ? res.data : task))
      );
      handleCancelEdit(); 
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      {}
      <form onSubmit={handleCreateTask} className="task-form">
        <h3>Add a new task</h3>
        <div className="task-form-content">
          <input
            type="text"
            placeholder="Enter your task here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add task</button>
        </div>
      </form>

      {}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks-message">Your line is clear! Add a new task to get started.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-ticket">
              
              {editingTaskId === task._id ? (
                <div className="task-edit">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="task-actions">
                    <button onClick={() => handleUpdateTask(task._id)} className="save-button">
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-ticket-content">
                    <p>{task.text}</p>
                    <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleStartEdit(task)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTask(task._id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;