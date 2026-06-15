const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

router.get('/', empleadoCtrl.obtenerTodos);
router.get('/:id', empleadoCtrl.obtenerUno);
router.post('/', empleadoCtrl.crearEmpleado);

module.exports = router;