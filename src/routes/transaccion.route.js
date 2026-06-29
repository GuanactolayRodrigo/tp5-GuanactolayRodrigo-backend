const express = require('express');
const router = express.Router();
const transaccionCtrl = require('../controllers/transaccion.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaccion:
 *       type: object
 *       properties:
 *         idiomaOrigen:
 *           type: string
 *         textoOrigen:
 *           type: string
 *         idiomaDestino:
 *           type: string
 *         textoDestino:
 *           type: string
 *         emailCliente:
 *           type: string
 *       example:
 *         idiomaOrigen: "es"
 *         textoOrigen: "Hola, ¿cómo estás?"
 *         idiomaDestino: "en"
 *         textoDestino: "Hello, how are you?"
 *         emailCliente: "juan.gomez@gmail.com"
 *         cliente:
 *           id: 1
 *           apellido: "Gomez"
 *           nombre: "Juan"
 *           dni: "12345678"
 */

/**
 * @swagger
 * /api/transaccion:
 *   get:
 *     summary: Retorna todas las transacciones registradas
 *     tags: [Transacciones]
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaccion'
 */
router.get('/', transaccionCtrl.obtenerTodas);

/**
 * @swagger
 * /api/transaccion:
 *   post:
 *     summary: Da de alta una nueva transacción de traducción
 *     tags: [Transacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaccion'
 *     responses:
 *       201:
 *         description: Transacción registrada exitosamente
 */
router.post('/', transaccionCtrl.crearTransaccion);

/**
 * @swagger
 * /api/transaccion/cliente/{email}:
 *   get:
 *     summary: Obtiene el historial de transacciones de un cliente por su email
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del cliente
 *     responses:
 *       200:
 *         description: Historial de transacciones obtenido
 */
router.get('/cliente/:email', transaccionCtrl.obtenerPorEmail);

/**
 * @swagger
 * /api/transaccion/idiomas/{origen}/{destino}:
 *   get:
 *     summary: Filtra transacciones por idioma de origen y destino
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: origen
 *         required: true
 *         schema:
 *           type: string
 *         description: Idioma de origen
 *       - in: path
 *         name: destino
 *         required: true
 *         schema:
 *           type: string
 *         description: Idioma de destino
 *     responses:
 *       200:
 *         description: Lista de transacciones filtradas
 */
router.get('/idiomas/:origen/:destino', transaccionCtrl.obtenerPorIdiomas);

module.exports = router;