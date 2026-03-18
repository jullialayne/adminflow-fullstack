const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql' // ou mysql/postgres
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importar modelos
db.Empresas = require('../models/empresas.model')(sequelize, Sequelize);
db.Usuarios = require('../models/usuarios.model')(sequelize, Sequelize);
// etc...

module.exports = db;