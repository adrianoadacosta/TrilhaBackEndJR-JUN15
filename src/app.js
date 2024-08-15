/** @format */

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./database'); // Adiciona a importação do database

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, async () => {
	console.log(`rodando na porta ${PORT}`);

	// Sincroniza o banco de dados antes de iniciar o servidor (opcional)
	try {
		await sequelize.sync(); // Sincroniza os modelos com o banco de dados
		console.log('banco de dados sincronizado.');
	} catch (error) {
		console.error('não foi possiel sincornizar o banco de dados:', error);
	}
});
