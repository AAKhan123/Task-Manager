const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Create Task
router.post('/', auth, async (req, res) => {
  const { title, description, category, priority } = req.body;
  try {
    const task = new Task({
      userId: req.user.id,
      title,
      description,
      category,
      priority,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get All Tasks
router.get('/', auth, async (req, res) => {
  const { category, status, search } = req.query;
  try {
    let query = { userId: req.user.id };
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  const { title, description, category, status, priority } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, category, status, priority } },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting task with ID:', req.params.id);
    console.log('User ID:', req.user.id);
    const task = await Task.findById(req.params.id);
    console.log('Found task:', task);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await task.deleteOne();
    console.log('Task deleted');
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;