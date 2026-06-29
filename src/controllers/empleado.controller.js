const Empleado = require('../models/empleado.model');
const empleadoCtrl = {};

empleadoCtrl.crearEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = await Empleado.create(req.body);
    res.status(201).json({ mensaje: 'Empleado creado', empleado: nuevoEmpleado });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empleado', detalle: error.message });
  }
};

empleadoCtrl.obtenerTodos = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados', detalle: error.message });
  }
};

empleadoCtrl.obtenerUno = async (req, res) => {
  try {
    const { dni } = req.params;
    const empleado = await Empleado.findOne({ where: { dni: dni } });
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleado', detalle: error.message });
  }
};

module.exports = empleadoCtrl;