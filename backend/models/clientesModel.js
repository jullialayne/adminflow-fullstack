module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Clientes', {

    IDCLIENTE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    NOME: {
      type: DataTypes.STRING
    },

    TELEFONE: {
      type: DataTypes.STRING
    },

    EMAIL: {
      type: DataTypes.STRING
    },

    DATACRIACAO: {
      type: DataTypes.DATE
    },

    DATAATUALIZACAO: {
      type: DataTypes.DATE
    }

  }, {
    tableName: 'CLIENTES',
    timestamps: false
  });
};