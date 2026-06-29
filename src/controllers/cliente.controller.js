const Cliente = require('../models/cliente.model');
const clienteCtrl = {};

clienteCtrl.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json({ mensaje: 'Cliente creado', cliente: nuevoCliente });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', detalle: error.message });
  }
};



module.exports = clienteCtrl;