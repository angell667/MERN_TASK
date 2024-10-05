const Task = require('../models/Task');

// Create a task
const createTask = async (req, res) => {
    const { name, description, dueDate } = req.body;
    try {
        const task = await Task.create({
            name,
            description,
            dueDate,
            user: req.user.id,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTasks };
