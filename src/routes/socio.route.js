const express = require('express');
const router = express.Router();
const socioCtrl = require('../controllers/socio.controller');

router.get('/activos', socioCtrl.obtenerActivos);
router.get('/', socioCtrl.obtenerTodos);
router.post('/', socioCtrl.crearSocio);
router.put('/:id', socioCtrl.modificarSocio);
router.delete('/:id', socioCtrl.eliminarSocio);

module.exports = router;