const express = require('express');
const router = express.Router();
const clienteCtrl = require('../controllers/cliente.controller');

router.post('/', clienteCtrl.crearCliente);





module.exports = router;