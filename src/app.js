/** @format */

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config();

console.log('JWT Secret:', process.env.JWT_SECRET);

app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, async () => {
	console.log(`Rodando na porta ${PORT}`);

	// Sincroniza o banco de dados antes de iniciar o servidor
	try {
		await sequelize.sync(); // Sincroniza os modelos com o banco de dados
		console.log('Banco de dados sincronizado.');
	} catch (error) {
		console.error('Não foi possível sincronizar o banco de dados:', error);
	}
});
