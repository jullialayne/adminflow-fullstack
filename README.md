# AdminFlow

## 👨‍💻 Sistema de gestão de aluguel de vestidos

Sistema fullstack administrativo desenvolvido para portfólio, com foco em gestão de clientes, usuários e controle de aluguéis de vestidos.

---

## 🚀 Sobre o projeto

O **AdminFlow** é um sistema web que simula um ambiente administrativo real, permitindo o gerenciamento de clientes, usuários e aluguéis.

O sistema possui validação de disponibilidade de vestidos por período, autenticação de usuários e arquitetura organizada em API REST.

---

## 🧠 Tecnologias utilizadas

### Frontend
- React
- Axios
- React Router

### Backend
- Node.js
- Express
- Sequelize (ORM)
- JWT (autenticação)
- bcrypt (criptografia de senha)

### Banco de Dados
- SQL Server

---

## 📦 Estrutura do projeto

```bash
/backend   → API REST (Node + Express)
/frontend  → Interface React
```

---

## 🧩 Entidades do sistema

- 👤 Usuários  
- 👥 Clientes  
- 👗 Vestidos  
- 📅 Aluguéis  

---

## 🔐 Funcionalidades

### 👤 Usuários
- Cadastro de usuários  
- Login com senha criptografada (bcrypt)  
- Autenticação de acesso  

### 👥 Clientes
- Cadastro de clientes  
- Listagem  
- Edição  
- Remoção  

### 👗 Vestidos
- Cadastro de vestidos  
- Controle de tamanho, cor e tema  
- Gestão de estoque  

### 📅 Aluguéis
- Registro de aluguel de vestidos  
- Controle de datas de retirada e devolução  
- Validação de disponibilidade por período  

---

## 🧠 Regra principal do sistema

Um vestido não pode ser alugado em períodos que já estejam ocupados.

O sistema valida conflitos de datas antes de permitir um novo aluguel.

---

## 🏗️ Arquitetura do backend

- controllers → regras HTTP (req/res)  
- services → regras de negócio  
- models → Sequelize  
- routes → endpoints da API  
- middlewares → validações e segurança  
- database → conexão e inicialização do Sequelize  

---

## 🔗 Endpoints principais da API

```
POST   /api/usuarios/login
POST   /api/usuarios

GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id

GET    /api/vestidos
POST   /api/vestidos

POST   /api/alugueis
GET    /api/alugueis
```

---

## 🚀 Como executar o projeto

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🎯 Objetivo do projeto

Este sistema foi desenvolvido para demonstrar habilidades em:

- Desenvolvimento fullstack (React + Node.js)
- Criação de API REST
- Modelagem de banco de dados relacional
- Regras de negócio reais (controle de reservas)
- Autenticação e segurança
- Arquitetura escalável de software

---

## 👨‍💻 Autor

Projeto desenvolvido para fins de portfólio.

---

## 💡 Melhorias futuras

- Dashboard com métricas em tempo real  
- Upload de imagens dos vestidos  
- Sistema de permissões (admin / usuário)  
- JWT completo com refresh token  
- Deploy em produção  
```
