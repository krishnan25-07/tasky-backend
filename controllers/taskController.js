import { readTasksFromFile, writeTasksToFile } from '../models/taskModel.js';

// GET all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await readTasksFromFile();
        res.json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST a new task (Create)
export const createTask = async (req, res) => {
    try {
        const { title, deadline } = req.body;
        const tasks = await readTasksFromFile();
        
        const newTask = { id: Date.now(), title, deadline };
        tasks.push(newTask);
        
        await writeTasksToFile(tasks);
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT / PATCH an existing task (Update)
export const updateTask = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        const { title, deadline } = req.body;
        const tasks = await readTasksFromFile();

        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: title !== undefined ? title : tasks[taskIndex].title,
            deadline: deadline !== undefined ? deadline : tasks[taskIndex].deadline
        };

        await writeTasksToFile(tasks);
        res.json({ success: true, task: tasks[taskIndex] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE a task (Delete)
export const deleteTask = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        let tasks = await readTasksFromFile();

        const taskExists = tasks.some(t => t.id === taskId);
        if (!taskExists) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        tasks = tasks.filter(t => t.id !== taskId);
        await writeTasksToFile(tasks);

        res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};