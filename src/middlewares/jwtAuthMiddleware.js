/** @format */

const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401); // Se não houver token, retorne 401 Unauthorized

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403); // Se houver um erro na verificação, retorne 403 Forbidden
		req.user = user;
		next();
	});
};

module.exports = jwtAuthMiddleware;
