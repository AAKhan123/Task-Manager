import React, { useState } from 'react';
import '../components/TaskForm.css';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'General',
    priority: initialData.priority || 'medium',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Title is required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
        ></textarea>
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="form-button">
        {initialData._id ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;