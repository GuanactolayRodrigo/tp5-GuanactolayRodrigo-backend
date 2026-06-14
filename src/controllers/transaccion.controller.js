const Transaccion = require('../models/transaccion.model');
const transaccionCtrl = {};

// Dar de alta una Transaccion (POST)
transaccionCtrl.crearTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = await Transaccion.create(req.body);
    res.status(201).json({ mensaje: 'Transacción registrada', transaccion: nuevaTransaccion });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la transacción', detalle: error.message });
  }
};

// obtener TODAS las Transacciones Registradas (GET)
transaccionCtrl.obtenerTodas = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones', detalle: error.message });
  }
};

// obtener transacciones de un cliente por email (GET)
transaccionCtrl.obtenerPorEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const transacciones = await Transaccion.findAll({
      where: { emailCliente: email }
    });
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial', detalle: error.message });
  }
};

// obtener transacciones por idioma origen y destino (GET)
transaccionCtrl.obtenerPorIdiomas = async (req, res) => {
  try {
    const { origen, destino } = req.params; 
    const transacciones = await Transaccion.findAll({
      where: {
        idiomaOrigen: origen,
        idiomaDestino: destino
      }
    });
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por idiomas', detalle: error.message });
  }
};

module.exports = transaccionCtrl;