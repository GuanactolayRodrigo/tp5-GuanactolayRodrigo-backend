const Publicacion = require('../models/publicacion.model');
const Empleado = require('../models/empleado.model');
const { Op } = require('sequelize'); 
const publicacionCtrl = {};

publicacionCtrl.crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido, imagenAsociada, fechaPublicacion, vigente, empleado } = req.body;

    if (!empleado || !empleado.id) {
      return res.status(400).json({ error: 'Debe enviar el objeto empleado con su respectivo id' });
    }
    
    const empleadoExiste = await Empleado.findByPk(empleado.id);
    if (!empleadoExiste) {
      return res.status(404).json({ error: `No se encontró ningún empleado con el ID: ${empleado.id}` });
    }

    const nuevaPublicacion = await Publicacion.create({
      titulo: titulo,
      contenido: contenido,
      imagenAsociada: imagenAsociada,
      fechaPublicacion: fechaPublicacion,
      vigente: vigente,
      empleadoId: empleado.id
    });

    res.status(201).json({ mensaje: 'Publicación creada con éxito', publicacion: nuevaPublicacion });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear publicación', detalle: error.message });
  }
};

publicacionCtrl.obtenerTodas = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: [{ model: Empleado, as: 'empleado' }] // incluye al empleado para qeu lo muestre en la peticion
    });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener publicaciones', detalle: error.message });
  }
};

publicacionCtrl.eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Publicacion.destroy({ where: { id } });
    if (eliminado) {
      res.status(200).json({ mensaje: 'Publicación eliminada' });
    } else {
      res.status(404).json({ error: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar', detalle: error.message });
  }
};

publicacionCtrl.modificarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Publicacion.update(req.body, { where: { id } });
    if (actualizado) {
      const pubActualizada = await Publicacion.findByPk(id, { include: [{ model: Empleado, as: 'empleado' }] });
      res.status(200).json({ mensaje: 'Publicación modificada', publicacion: pubActualizada });
    } else {
      res.status(404).json({ error: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar', detalle: error.message });
  }
};

publicacionCtrl.buscarCombinada = async (req, res) => {
  try {
    const { titulo, vigente } = req.body;
    
    const publicaciones = await Publicacion.findAll({
      where: {
        titulo: {
          [Op.iLike]: `%${titulo}%` 
        },
        vigente: vigente
      },
      include: [{ model: Empleado, as: 'empleado' }]
    });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error en la busqueda', detalle: error.message });
  }
};

module.exports = publicacionCtrl;