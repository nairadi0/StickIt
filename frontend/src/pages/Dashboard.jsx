import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

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
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`); 

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully.');
    navigate('/login');
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
    if (!editingText.trim()) return; // Don't save empty tasks

    try {
      const res = await api.put(`/tasks/${taskId}`, { text: editingText });

      // Update the tasks list with the new data
      setTasks(
        tasks.map((task) => (task._id === taskId ? res.data : task))
      );
      
      // Reset editing state
      handleCancelEdit();
    } catch (err) {
      console.error('Error updating task:', err);
    }
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

      {/* --- Task List (Modified) --- */}
      <div className="task-list">
        <h3>Your Notes</h3>
        {tasks.length === 0 ? (
          <p>You have no notes yet. Create one!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
              
              {/* --- CONDITIONAL RENDERING --- */}
              {editingTaskId === task._id ? (
                // --- This is the EDITING view ---
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={() => handleUpdateTask(task._id)} style={{ marginLeft: '10px' }}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit} style={{ marginLeft: '5px' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                // --- This is the NORMAL view ---
                <div>
                  <p>{task.text}</p>
                  <small>Created at: {new Date(task.createdAt).toLocaleString()}</small>
                  <button 
                    onClick={() => handleStartEdit(task)} 
                    style={{ marginLeft: '10px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                  >
                    Delete
                  </button>
                </div>
              )}
              {/* --- END CONDITIONAL RENDERING --- */}

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;