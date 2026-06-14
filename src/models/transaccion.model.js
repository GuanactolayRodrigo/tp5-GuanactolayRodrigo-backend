const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Transaccion = sequelize.define('Transaccion', {
  idiomaOrigen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  textoOrigen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idiomaDestino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  textoDestino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailCliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'transacciones'
});

module.exports = Transaccion;