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

router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server error');
  }
});
router.put('/:id', auth, async (req, res) => {
  const { text } = req.body; // Get the new text from the request

  // Simple validation: check if text was provided
  if (!text) {
    return res.status(400).json({ msg: 'Text is required' });
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure the logged-in user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the task in the database
    // { new: true } tells Mongoose to return the *updated* document
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { text: text },
      { new: true }
    );

    res.json(updatedTask); // Send the updated task back
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;