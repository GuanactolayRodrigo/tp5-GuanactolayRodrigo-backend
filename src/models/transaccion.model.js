const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Cliente = require('./cliente.model');

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

Transaccion.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });
Cliente.hasMany(Transaccion, { foreignKey: 'clienteId' });

module.exports = Transaccion;