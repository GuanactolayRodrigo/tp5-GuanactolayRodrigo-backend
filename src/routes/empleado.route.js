const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - apellido
 *         - nombre
 *         - dni
 *         - email
 *       properties:
 *         apellido:
 *           type: string
 *           description: Apellido del empleado
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         dni:
 *           type: string
 *           description: Documento Nacional de Identidad
 *         email:
 *           type: string
 *           description: Correo electrónico del empleado
 *       example:
 *         apellido: Gomez
 *         nombre: Ana
 *         dni: "40123456"
 *         email: ana@empresa.com
 */

/**
 * @swagger
 * /api/empleado:
 *   get:
 *     summary: Retorna la lista de todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 */
router.get('/', empleadoCtrl.obtenerTodos);

/**
 * @swagger
 * /api/empleado/{dni}:
 *   get:
 *     summary: Obtiene un empleado por su DNI
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: Documento Nacional de Identidad del empleado
 *     responses:
 *       200:
 *         description: Información del empleado obtenida con éxito
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/:dni', empleadoCtrl.obtenerUno);

/**
 * @swagger
 * /api/empleado:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', empleadoCtrl.crearEmpleado);

module.exports = router;