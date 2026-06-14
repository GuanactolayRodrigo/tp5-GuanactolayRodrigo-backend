const Socio = require('../models/socio.model');
const socioCtrl = {};

// Dar de alta un Socio (POST)
socioCtrl.crearSocio = async (req, res) => {
  try {
    const nuevoSocio = await Socio.create(req.body);
    res.status(201).json({ mensaje: 'Socio creado con éxito', socio: nuevoSocio });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el socio', detalle: error.message });
  }
};

// Obtener todos los socios (GET)
socioCtrl.obtenerTodos = async (req, res) => {
  try {
    const socios = await Socio.findAll();
    res.status(200).json(socios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los socios', detalle: error.message });
  }
};

// Obtener los socios activos (GET)
socioCtrl.obtenerActivos = async (req, res) => {
  try {
    const sociosActivos = await Socio.findAll({
      where: { activo: true }
    });
    res.status(200).json(sociosActivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener socios activos', detalle: error.message });
  }
};

// modificar un socio (PUT)
socioCtrl.modificarSocio = async (req, res) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Socio.update(req.body, {
      where: { id: id }
    });

    if (actualizado) {
      const socioActualizado = await Socio.findByPk(id);
      res.status(200).json({ mensaje: 'Socio modificado', socio: socioActualizado });
    } else {
      res.status(404).json({ error: 'Socio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el socio', detalle: error.message });
  }
};

// eliminar un socio (DELETE)
socioCtrl.eliminarSocio = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Socio.destroy({
      where: { id: id }
    });

    if (eliminado) {
      res.status(200).json({ mensaje: 'Socio eliminado' });
    } else {
      res.status(404).json({ error: 'Socio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el socio', detalle: error.message });
  }
};

module.exports = socioCtrl;