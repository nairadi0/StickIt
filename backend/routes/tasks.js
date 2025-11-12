const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Task = require('../models/Task');     


router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/', auth, async (req, res) => {
  const { text } = req.body;

  try {
    const newTask = new Task({
      text: text,
      user: req.user.id, 
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;