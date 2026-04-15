module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
    IdCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    Nome: { type: DataTypes.STRING(150), allowNull: false },
    Documento: { type: DataTypes.STRING(30) },

    Email: { type: DataTypes.STRING(150) },
    Telefone: { type: DataTypes.STRING(30) },

    Cidade: { type: DataTypes.STRING(100) },
    Estado: { type: DataTypes.STRING(50) },

    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }

  }, { 
    tableName: 'CLIENTES', 
    timestamps: false 
  });

  Clientes.associate = models => {
    Clientes.hasMany(models.Alugueis, { foreignKey: 'Cliente_Id' });
  };

  return Clientes;
};