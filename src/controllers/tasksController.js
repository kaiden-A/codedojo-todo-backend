const Task = require('../models/task');

const tasksController = {
  async getAll(req, res) {
    const tasks = await Task.findAll();
    res.json({ data: tasks });
  },

  async getById(req, res) {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ data: task });
  },

  async create(req, res) {
    const { title, description } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task = await Task.create(title.trim(), description?.trim() || null);
    res.status(201).json({ data: task });
  },

  async update(req, res) {
    const existing = await Task.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const { title, description, is_completed } = req.body;
    const task = await Task.update(req.params.id, {
      title: title?.trim(),
      description: description?.trim(),
      is_completed,
    });
    res.json({ data: task });
  },

  async delete(req, res) {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await Task.delete(req.params.id);
    res.json({ message: 'Task deleted' });
  },
};

module.exports = tasksController;
