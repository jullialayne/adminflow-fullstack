module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
    IdCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdEmpresa: { type: DataTypes.INTEGER, allowNull: false },
    Nome: { type: DataTypes.STRING(150), allowNull: false },
    Documento: { type: DataTypes.STRING(30) },
    Email: { type: DataTypes.STRING(150) },
    Telefone: { type: DataTypes.STRING(30) },
    Cidade: { type: DataTypes.STRING(100) },
    Estado: { type: DataTypes.STRING(50) },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'Clientes', timestamps: false });

  Clientes.associate = models => {
    Clientes.belongsTo(models.Empresas, { foreignKey: 'IdEmpresa' });
    Clientes.hasMany(models.Pedidos, { foreignKey: 'IdCliente' });
  };

  return Clientes;
};