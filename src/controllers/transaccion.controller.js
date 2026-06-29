const Transaccion = require('../models/transaccion.model');
const Cliente = require('../models/cliente.model');
const transaccionCtrl = {};

// Dar de alta una Transaccion (POST)
transaccionCtrl.crearTransaccion = async (req, res) => {
  try {
     const { idiomaOrigen, textoOrigen, idiomaDestino, textoDestino, emailCliente, cliente } = req.body;

    if (!cliente || !cliente.id) {
      return res.status(400).json({ error: 'Debe enviar el objeto cliente con su respectivo id' });
    }
    
    const clienteExiste = await Cliente.findByPk(cliente.id);
    if (!clienteExiste) {
      return res.status(404).json({ error: `No se encontró ningún cliente con el ID: ${cliente.id}` });
    }

    const nuevaTransaccion = await Transaccion.create({
      idiomaOrigen: idiomaOrigen,
      textoOrigen: textoOrigen,
      idiomaDestino: idiomaDestino,
      textoDestino: textoDestino,
      emailCliente: emailCliente,
      clienteId: cliente.id
    });

    res.status(201).json({ mensaje: 'Transacción creada con éxito', transaccion: nuevaTransaccion });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la transacción', detalle: error.message });
  }
};

// obtener TODAS las Transacciones Registradas (GET)
transaccionCtrl.obtenerTodas = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [{ model: Cliente, as: 'cliente' }] 
    });
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