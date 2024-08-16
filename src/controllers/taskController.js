/** @format */

const Task = require('../models/Task');

const createTask = async (req, res) => {
	const { title, description, status } = req.body;
	const userId = req.user.id;
	try {
		const task = await Task.create({ title, description, status, userId });
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error: 'Falha ao criar a tarefa' });
	}
};

const getTasks = async (req, res) => {
	const userId = req.user.id;
	try {
		const tasks = await Task.findAll({ where: { userId } });
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Falha ao buscar tarefas' });
	}
};

const getTaskById = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	try {
		const task = await Task.findOne({ where: { id, userId } });
		if (task) {
			res.status(200).json(task);
		} else {
			res.status(404).json({ error: 'Tarefa não encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Falha ao buscar a tarefa' });
	}
};

const updateTask = async (req, res) => {
	const { id } = req.params;
	const { title, description, status } = req.body;
	const userId = req.user.id;
	try {
		const task = await Task.findOne({ where: { id, userId } });
		if (task) {
			task.title = title;
			task.description = description;
			task.status = status;
			await task.save();
			res.status(200).json(task);
		} else {
			res.status(404).json({ error: 'Tarefa não encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Falha ao atualizar a tarefa' });
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;
	try {
		const task = await Task.findOne({ where: { id, userId } });
		if (task) {
			await task.destroy();
			res.status(204).json();
		} else {
			res.status(404).json({ error: 'Tarefa não encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Falha ao deletar a terefa' });
	}
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
