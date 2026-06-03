# AdminFlow

Sistema administrativo fullstack para gerenciamento de locação de vestidos.

## 🚀 Tecnologias

### Backend
- Node.js
- Express
- Sequelize
- SQL Server
- JWT
- Bcrypt

### Ferramentas
- Postman
- Git
- GitHub

## 📦 Estrutura do Projeto

```text
adminflow-fullstack/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── database/
│   ├── middlewares/
│   └── src/
│
├── frontend/
│
└── docs/
    └── postman/
```

## 🔐 Funcionalidades

### Usuários
- Cadastro de usuários
- Login com JWT
- Listagem de usuários
- Edição de usuários
- Remoção de usuários

### Clientes
- Cadastro de clientes
- Listagem de clientes
- Busca por cliente
- Edição de clientes
- Remoção de clientes

### Vestidos
- Cadastro de vestidos
- Listagem de vestidos
- Busca por vestido
- Edição de vestidos
- Remoção de vestidos
- Controle de disponibilidade

### Aluguéis
- Cadastro de contratos de aluguel
- Validação de conflito de datas
- Controle de reservas
- Atualização de status
- Cálculo de valor e multa

## 🗄️ Banco de Dados

O projeto utiliza SQL Server com Sequelize ORM.

### Entidades

- Usuários
- Clientes
- Vestidos
- Aluguéis

## ⚙️ Configuração

### Clone o projeto

```bash
git clone https://github.com/seu-usuario/adminflow-fullstack.git
```

### Instale as dependências

```bash
cd backend
npm install
```

### Configure o arquivo .env

```env
DB_HOST=localhost
DB_NAME=ADMINFLOW
DB_USER=sa
DB_PASS=sua_senha

JWT_SECRET=secretKeyAdminFlowQuadrilha123
```

### Execute o servidor

```bash
npm run dev
```

Servidor disponível em:

```text
http://localhost:3000
```

## 🧪 Testes da API

As collections do Postman estão disponíveis em:

```text
docs/postman/
```

### Collections

- usuarios.postman_collection.json
- clientes.postman_collection.json
- vestidos.postman_collection.json
- alugueis.postman_collection.json

### Environment

- AdminFlow.postman_environment.json

### Variáveis utilizadas

```text
baseUrl=http://localhost:3000/api
token=
```

## 📌 Endpoints

### Usuários

```http
POST   /api/usuarios
POST   /api/usuarios/login
GET    /api/usuarios
GET    /api/usuarios/:id
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id
```

### Clientes

```http
POST   /api/clientes
GET    /api/clientes
GET    /api/clientes/:id
PUT    /api/clientes/:id
DELETE /api/clientes/:id
```

### Vestidos

```http
POST   /api/vestidos
GET    /api/vestidos
GET    /api/vestidos/:id
PUT    /api/vestidos/:id
DELETE /api/vestidos/:id
```

### Aluguéis

```http
POST   /api/alugueis
GET    /api/alugueis
GET    /api/alugueis/:id
PUT    /api/alugueis/:id
DELETE /api/alugueis/:id
```

## 🔒 Autenticação

As rotas protegidas utilizam JWT.

Exemplo:

```http
Authorization: Bearer <token>
```

O token é obtido através da rota de login.

## 👨‍💻 Autor

Projeto desenvolvido para fins de estudo e portfólio.