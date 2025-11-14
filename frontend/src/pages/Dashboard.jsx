import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Dashboard.css'; 
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableTicket from '../components/SortableTask.jsx';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, 
      },
    })
  );

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
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);

      
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <form onSubmit={handleCreateTask} className="task-form">
        <h3>Add a new task</h3>
        <div className="task-form-content">
          <input
            type="text"
            placeholder="Write your note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add task</button>
        </div>
      </form>

      {}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="task-list">
          {}
          <SortableContext
            items={tasks.map(task => task._id)} 
            strategy={verticalListSortingStrategy} 
          >
            {tasks.length === 0 ? (
              <p className="no-tasks-message">Your line is clear!</p>
            ) : (
              tasks.map((task) => (
                <SortableTicket
                  key={task._id}
                  task={task}
                  editingTaskId={editingTaskId}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  handleStartEdit={() => handleStartEdit(task)}
                  handleCancelEdit={handleCancelEdit}
                  handleUpdateTask={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                />
              ))
            )}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}

export default Dashboard;