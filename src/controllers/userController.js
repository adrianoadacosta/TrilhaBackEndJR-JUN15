/** @format */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		// Verifica se o usuário já existe
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ error: 'Usuario ja existente' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ username, password: hashedPassword });
		res.status(201).json({ message: 'Usuario criado com sucesso!!' });
	} catch (error) {
		console.error('Erro ao criar usuario :', error);
		res.status(500).json({ error: 'Criação do usuario falhou' });
	}
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ where: { username } });
		if (user) {
			console.log('Comparando senha:', password);
			console.log('Hash armazenado:', user.password);
			if (await bcrypt.compare(password, user.password)) {
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
					expiresIn: '1h',
				});
				res.status(200).json({ token });
			} else {
				res.status(401).json({ error: 'Credenciais invalidas' });
			}
		} else {
			res.status(401).json({ error: 'Credenciais invalidas' });
		}
	} catch (error) {
		console.error('Erro no login do usuario :', error);
		res.status(500).json({ error: 'Erro de login' });
	}
};

module.exports = { registerUser, loginUser };
