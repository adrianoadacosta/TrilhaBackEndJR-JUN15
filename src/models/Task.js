/** @format */

const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const Task = sequelize.define('Task', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.ENUM('pendente', 'processando', 'completado'),
		allowNull: false,
		defaultValue: 'pendente',
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: 'id',
		},
	},
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
