module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    IdUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdEmpresa: { type: DataTypes.INTEGER, allowNull: false },
    Nome: { type: DataTypes.STRING(150), allowNull: false },
    Email: { type: DataTypes.STRING(150), allowNull: false },
    SenhaHash: { type: DataTypes.STRING(255), allowNull: false },
    Perfil: { type: DataTypes.STRING(50) },
    Ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'Usuarios', timestamps: false });

  Usuarios.associate = models => {
    Usuarios.belongsTo(models.Empresas, { foreignKey: 'IdEmpresa' });
    Usuarios.hasMany(models.Pedidos, { foreignKey: 'IdUsuario' });
  };

  return Usuarios;
};