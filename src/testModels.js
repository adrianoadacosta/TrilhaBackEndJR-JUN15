/** @format */

const sequelize = require('./database');
const User = require('./models/User');
const Task = require('./models/Task');

async function testModels() {
	try {
		// Sincroniza os modelos com o banco de dados
		await sequelize.sync({ force: true });
		console.log('Models sincronizados com banco de dados.');

		// Testa a criação de um usuário
		const user = await User.create({
			username: 'usuarioteste',
			password: 'senha',
		});
		console.log('Usuario criado :', user.toJSON());

		// Testa a criação de uma tarefa
		const task = await Task.create({
			title: 'Tarefa teste',
			description: 'Testando a criar tarefa.',
			status: 'pending',
			userId: user.id,
		});
		console.log('Tarefa criada :', task.toJSON());
	} catch (error) {
		console.error('Error testando models:', error);
	} finally {
		// Fecha a conexão com o banco de dados
		await sequelize.close();
	}
}

testModels();
