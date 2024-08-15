/** @format */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database.sqlite', // Caminho do banco de dados
});

// Testar conexão com o banco de dados
sequelize
	.authenticate()
	.then(() => {
		console.log('Conectado ao banco de dados com sucesso!!!!');
	})
	.catch((err) => {
		console.error('Não foi possivel conecatr ao bando de dados:', err);
	});

module.exports = sequelize;
