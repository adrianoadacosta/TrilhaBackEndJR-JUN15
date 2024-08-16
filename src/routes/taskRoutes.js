/** @format */

const express = require('express');
const {
	createTask,
	getTasks,
	getTaskById,
	updateTask,
	deleteTask,
} = require('../controllers/taskController');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const router = express.Router();

router.post('/', jwtAuthMiddleware, createTask);
router.get('/', jwtAuthMiddleware, getTasks);
router.get('/:id', jwtAuthMiddleware, getTaskById);
router.put('/:id', jwtAuthMiddleware, updateTask);
router.delete('/:id', jwtAuthMiddleware, deleteTask);

module.exports = router;
