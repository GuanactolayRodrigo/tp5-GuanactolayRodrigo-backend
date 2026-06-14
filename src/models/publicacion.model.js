const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Empleado = require('./empleado.model');

const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagenAsociada: {
    type: DataTypes.TEXT, // TEXT porque el base64 puede ser muy largo
    allowNull: true
  },
  fechaPublicacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vigente: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'publicaciones'
});

// una publicacion pertenece a un empleado
Publicacion.belongsTo(Empleado, { foreignKey: 'empleadoId', as: 'empleado' });
// Un empleado puede tener muchas publicaciones
Empleado.hasMany(Publicacion, { foreignKey: 'empleadoId' });

module.exports = Publicacion;