module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    IdUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    Nome: { type: DataTypes.STRING(150), allowNull: false },
Email: { 
  type: DataTypes.STRING(150), 
  allowNull: false,
  unique: true
},
    SenhaHash: { type: DataTypes.STRING(255), allowNull: false },

    Ativo: { type: DataTypes.BOOLEAN, defaultValue: true },

    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }

  }, { 
    tableName: 'USUARIOS', 
    timestamps: false 
  });

  Usuarios.associate = () => {
    // sem relacionamentos (simples)
  };

  return Usuarios;
};