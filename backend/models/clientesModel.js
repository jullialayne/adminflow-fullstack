module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Clientes', {

    IdCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'IDCLIENTE'
    },

    Nome: {
      type: DataTypes.STRING,
      field: 'NOME'
    },

    Telefone: {
      type: DataTypes.STRING,
      field: 'TELEFONE'
    },

    Email: {
      type: DataTypes.STRING,
      field: 'EMAIL'
    },

    DataCriacao: {
      type: DataTypes.DATE,
      field: 'DATACRIACAO'
    },

    DataAtualizacao: {
      type: DataTypes.DATE,
      field: 'DATAATUALIZACAO'
    }

  }, {
    tableName: 'CLIENTES',
    timestamps: false
  });
};