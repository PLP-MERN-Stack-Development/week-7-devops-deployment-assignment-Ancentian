const Task = require('../models/Task')

exports.createTask = async (req, res) => {
    const task = await Task.create({...req.body, owner: req.user.id})
    res.json(task)
}

exports.getMyTasks = async (req, res) => {
    const tasks = await Task.find({owner: req.user.id})
    res.json(tasks)
}

exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate("owner", "email")
    res.json(tasks)
}

