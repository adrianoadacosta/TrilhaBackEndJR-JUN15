/** @format */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definição das opções Swagger
const swaggerSpec = swaggerJsdoc({
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Task Manager API',
			version: '1.0.0',
			description: 'API para gerenciamento de tarefas',
		},
		components: {
			securitySchemes: {
				BearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				BearerAuth: [],
			},
		],
	},
	apis: ['./src/routes/*.js'],
});

// Exportar o swaggerUi e swaggerSpec
module.exports = {
	swaggerUi,
	swaggerSpec,
};
