# Gerenciamento de Tarefas - API RESTful

Este é um projeto de uma API RESTful para gerenciamento de tarefas. A API permite que os usuários criem contas, façam login e gerenciem suas tarefas (criar, listar, atualizar e deletar).

## Índice

- [Tecnologias](#tecnologias)
- [Configuração do Projeto](#configuração-do-projeto)
- [Execução do Projeto](#execução-do-projeto)
- [Endpoints da API](#endpoints-da-api)
  - [Autenticação](#autenticação)
  - [Tarefas](#tarefas)


## Tecnologias

As principais tecnologias utilizadas neste projeto são:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/)
- [JSON Web Token (JWT)](https://jwt.io/)

## Configuração do Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Passo a Passo

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/task-manager-api.git
```
2. Acesse a pasta do projeto:
```bash
cd task-manager-api
```
3. Instale as dependências:
```bash
npm install
```
4. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione a seguinte linha:
```bash
JWT_SECRET=sua_chave_secreta_aqui
```
5. Sincronize o banco de dados:
```bash
npx sequelize-cli db:migrate
```

### Execução do Projeto
Para iniciar a aplicação, execute o comando:
```bash
npm start
```
O servidor será iniciado e estará disponível em http://localhost:3000.

### Endpoints da API

1. Autenticação:
-> Registrar Usuário
-> Endpoint: POST /api/users/register
-> Descrição: Registra um novo usuário.
-> Body 
```json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

-> Login
-> Endpoint: POST /api/users/login
-> Descrição: Faz login de um usuário e retorna um token JWT.
-> Body 
```json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

-> Rota Protegida (Exemplo)
-> Endpoint: GET /api/protected
-> Descrição: Acessa uma rota protegida para testar a autenticação.
-> Headers: Authorization: Bearer {seu_token_jwt} 

2. Tarefas:
-> Criar Tarefa
-> Endpoint: POST /api/tasks
-> Descrição: Cria uma nova tarefa para o usuário autenticado.
-> Headers: Authorization: Bearer {seu_token_jwt}
-> Body 
```json
{
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa",
  "status": "pendente" // ou "concluída"
}
```

-> Listar Tarefas
-> Endpoint: GET /api/tasks
-> Descrição: Lista todas as tarefas do usuário autenticado.
-> Headers: Authorization: Bearer {seu_token_jwt}

-> Buscar Tarefa por ID
-> Endpoint: GET /api/tasks/:id
-> Descrição: Busca uma tarefa específica pelo ID para o usuário autenticado.
-> Headers: Authorization: Bearer {seu_token_jwt}

-> Atualizar Tarefa
-> Endpoint: PUT /api/tasks/:id
-> Descrição: Atualiza uma tarefa existente do usuário autenticado.
-> Headers: Authorization: Bearer {seu_token_jwt}
-> Body 
```json
{
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa",
  "status": "pendente" // ou "concluída"
}
```

-> Deletar Tarefa
-> Endpoint: DELETE /api/tasks/:id
-> Descrição: Deleta uma tarefa do usuário autenticado.
-> Headers: Authorization: Bearer {seu_token_jwt}
