module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    IdUsuario: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
      field: 'IDUSUARIO'
    },

    Nome: { 
      type: DataTypes.STRING(150), 
      allowNull: false,
      field: 'NOME'
    },

    Email: { 
      type: DataTypes.STRING(150), 
      allowNull: false,
      unique: true,
      field: 'EMAIL'
    },

    SenhaHash: { 
      type: DataTypes.STRING(255), 
      allowNull: false,
      field: 'SENHAHASH'
    },

    DataCriacao: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
      field: 'DATACRIACAO'
    },

    DataAtualizacao: { 
      type: DataTypes.DATE,
      field: 'DATAATUALIZACAO'
    }

  }, { 
    tableName: 'USUARIOS', 
    timestamps: false 
  });

  Usuarios.associate = () => {
    // sem relacionamentos (simples)
  };

  return Usuarios;
};