import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import '../pages/Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ category: '', status: '', search: '' });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: filter,
      });
      setTasks(res.data);
    } catch (err) {
      alert('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const createTask = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTasks();
    } catch (err) {
      alert('Error creating task');
    }
  };

  const updateTask = async (data) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      alert('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log('Deleting task with ID:', id);
      console.log('Token:', localStorage.getItem('token'));
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Delete response:', response.data);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err.response?.data || err);
      alert('Error deleting task: ' + (err.response?.data?.msg || 'Unknown error'));
    }
  };

  const markTask = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
    } catch (err) {
      alert('Error updating task status');
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Assign Your Tasks Today!</h2>
      <TaskForm onSubmit={editingTask ? updateTask : createTask} initialData={editingTask || {}} />
      <div className="tasks-filter">
        <input
          type="text"
          placeholder="Search by title"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="filter-input"
        />
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-info">Category: {task.category}</p>
            <p className="task-info">Priority: {task.priority}</p>
            <p className="task-info">Status: {task.status}</p>
            <div className="task-actions">
              <button
                onClick={() => setEditingTask(task)}
                className="task-button task-button-edit"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="task-button task-button-delete"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  markTask(task._id, task.status === 'pending' ? 'completed' : 'pending')
                }
                className="task-button task-button-mark"
              >
                {task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;