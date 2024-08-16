/** @format */

const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

router.get('/protected', jwtAuthMiddleware, (req, res) => {
	res.status(200).json({ message: 'Essa é uma sessão protegida' });
});

module.exports = router;
