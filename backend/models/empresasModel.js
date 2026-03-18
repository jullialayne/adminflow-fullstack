module.exports = (sequelize, DataTypes) => {
  const Empresas = sequelize.define('Empresas', {
    IdEmpresa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nome: { type: DataTypes.STRING(150), allowNull: false },
    CNPJ: { type: DataTypes.STRING(20) },
    Ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'Empresas', timestamps: false });

  Empresas.associate = models => {
    Empresas.hasMany(models.Usuarios, { foreignKey: 'IdEmpresa' });
    Empresas.hasMany(models.Clientes, { foreignKey: 'IdEmpresa' });
    Empresas.hasMany(models.Produtos, { foreignKey: 'IdEmpresa' });
    Empresas.hasMany(models.Pedidos, { foreignKey: 'IdEmpresa' });
  };

  return Empresas;
};