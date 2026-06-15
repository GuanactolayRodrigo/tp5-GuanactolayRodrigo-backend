const express = require('express');
const router = express.Router();
const socioCtrl = require('../controllers/socio.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Socio:
 *       type: object
 *       required:
 *         - apellido
 *         - nombre
 *         - dni
 *         - email
 *       properties:
 *         apellido:
 *           type: string
 *         nombre:
 *           type: string
 *         dni:
 *           type: string
 *         email:
 *           type: string
 *         activo:
 *           type: boolean
 *           description: Estado de actividad del socio
 *       example:
 *          apellido: "Gomez"
 *          nombre: "Juan"
 *          dni: "12345678"
 *          email: "juan.gomez@gmail.com"
 *          activo: true
 */

/**
 * @swagger
 * /api/socio/activos:
 *   get:
 *     summary: Obtiene la lista de socios activos
 *     tags: [Socios]
 *     responses:
 *       200:
 *         description: Lista de socios activos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Socio'
 */
router.get('/activos', socioCtrl.obtenerActivos);

/**
 * @swagger
 * /api/socio:
 *   get:
 *     summary: Obtiene todos los socios registrados
 *     tags: [Socios]
 *     responses:
 *       200:
 *         description: Lista completa de socios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Socio'
 */
router.get('/', socioCtrl.obtenerTodos);

/**
 * @swagger
 * /api/socio:
 *   post:
 *     summary: Crea un nuevo socio
 *     tags: [Socios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Socio'
 *     responses:
 *       201:
 *         description: Socio creado con éxito
 */
router.post('/', socioCtrl.crearSocio);

/**
 * @swagger
 * /api/socio/{id}:
 *   put:
 *     summary: Modifica los datos de un socio existente
 *     tags: [Socios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del socio a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Socio'
 *     responses:
 *       200:
 *         description: Socio modificado con éxito
 *       404:
 *         description: Socio no encontrado
 */
router.put('/:id', socioCtrl.modificarSocio);

/**
 * @swagger
 * /api/socio/{id}:
 *   delete:
 *     summary: Elimina un socio del sistema
 *     tags: [Socios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del socio a eliminar
 *     responses:
 *       200:
 *         description: Socio eliminado con éxito
 *       404:
 *         description: Socio no encontrado
 */
router.delete('/:id', socioCtrl.eliminarSocio);

module.exports = router;