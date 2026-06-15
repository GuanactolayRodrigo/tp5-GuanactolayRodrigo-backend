const express = require('express');
const router = express.Router();
const publicacionCtrl = require('../controllers/publicacion.controller');

router.get('/', publicacionCtrl.obtenerTodas);
router.post('/', publicacionCtrl.crearPublicacion);
router.post('/buscar', publicacionCtrl.buscarCombinada);
router.put('/:id', publicacionCtrl.modificarPublicacion);
router.delete('/:id', publicacionCtrl.eliminarPublicacion);

module.exports = router;