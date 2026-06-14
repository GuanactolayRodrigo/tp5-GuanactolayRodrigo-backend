const express = require('express');
const router = express.Router();
const transaccionCtrl = require('../controllers/transaccion.controller');

router.get('/', transaccionCtrl.obtenerTodas);
router.post('/', transaccionCtrl.crearTransaccion);
router.get('/cliente/:email', transaccionCtrl.obtenerPorEmail);
router.get('/idiomas/:origen/:destino', transaccionCtrl.obtenerPorIdiomas);

module.exports = router;