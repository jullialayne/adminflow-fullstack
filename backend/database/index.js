const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* =========================
   IMPORTAÇÃO DOS MODELS
========================= */

db.usuariosModel = require('../models/usuariosModel')(sequelize, DataTypes);
db.clientesModel = require('../models/clientesModel')(sequelize, DataTypes);
db.vestidosModel = require('../models/vestidosModel')(sequelize, DataTypes);
db.alugueisModel = require('../models/alugueisModel')(sequelize, DataTypes);

/* =========================
   ASSOCIAÇÕES
========================= */

Object.keys(db).forEach((key) => {
  if (db[key].associate) {
    db[key].associate(db);
  }
});

/* =========================
   CONEXÃO
========================= */

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco conectado');
  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
  }
}

conectar();

module.exports = db;