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

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Operações relacionadas a tarefas
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa para o usuário autenticado.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *                 example: "Comprar leite"
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *                 example: "Comprar leite no supermercado"
 *               status:
 *                 type: string
 *                 description: Status da tarefa (pendente ou concluída)
 *                 example: "pendente"
 *             required:
 *               - title
 *               - status
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da tarefa criada
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                 status:
 *                   type: string
 *                   description: Status da tarefa (pendente ou concluída)
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', jwtAuthMiddleware, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lista todas as tarefas
 *     description: Retorna todas as tarefas do usuário autenticado.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da tarefa
 *                   title:
 *                     type: string
 *                     description: Título da tarefa
 *                   description:
 *                     type: string
 *                     description: Descrição da tarefa
 *                   status:
 *                     type: string
 *                     description: Status da tarefa (pendente ou concluída)
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', jwtAuthMiddleware, getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica pelo ID
 *     description: Retorna os detalhes de uma tarefa específica para o usuário autenticado, baseado no ID fornecido.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa a ser retornada
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarefa encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da tarefa
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                 status:
 *                   type: string
 *                   description: Status da tarefa (pendente ou concluída)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', jwtAuthMiddleware, getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     description: Atualiza os detalhes de uma tarefa específica para o usuário autenticado, baseado no ID fornecido.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *               status:
 *                 type: string
 *                 description: Status da tarefa (pendente ou concluída)
 *             required:
 *               - title
 *               - status
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da tarefa
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                 status:
 *                   type: string
 *                   description: Status da tarefa (pendente ou concluída)
 *       400:
 *         description: Solicitação inválida (por exemplo, dados de entrada inválidos)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', jwtAuthMiddleware, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     description: Deleta uma tarefa do usuário autenticado.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa que será deletada
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', jwtAuthMiddleware, deleteTask);

module.exports = router;
