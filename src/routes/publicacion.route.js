const express = require('express');
const router = express.Router();
const publicacionCtrl = require('../controllers/publicacion.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Publicacion:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *         contenido:
 *           type: string
 *         imagenAsociada:
 *           type: string
 *         fechaPublicacion:
 *           type: string
 *         vigente:
 *           type: boolean
 *         empleadoId:
 *           type: integer
 *         empleado:
 *           $ref: '#/components/schemas/Empleado'
 *       example:
 *         titulo: "Mi primera publicacion"
 *         contenido: "Esta es el contenido de mi primera publicación."
 *         imagenAsociada: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *         fechaPublicacion: "2024-06-01"
 *         vigente: true
 *         empleado:
 *           id: 1
 *           apellido: "Gomez"
 *           nombre: "Ana"
 *           dni: "40123456"
 *           email: "anam@gmail.com"
 */

/**
 * @swagger
 * /api/publicacion:
 *   get:
 *     summary: Obtiene todas las publicaciones
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publicacion'
 */
router.get('/', publicacionCtrl.obtenerTodas);

/**
 * @swagger
 * /api/publicacion:
 *   post:
 *     summary: Crea una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publicacion'
 *     responses:
 *       201:
 *         description: Publicación creada con éxito
 */
router.post('/', publicacionCtrl.crearPublicacion);

/**
 * @swagger
 * /api/publicacion/buscar:
 *   post:
 *     summary: Realiza una busqueda combinada de publicaciones. Se debe enviar la vigencia (true o false) y un fragmento del título.
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               vigente:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publicacion'
 */
router.post('/buscar', publicacionCtrl.buscarCombinada);

/**
 * @swagger
 * /api/publicacion/{id}:
 *   put:
 *     summary: Actualiza una publicación existente. Se puede actualizar cualquier campo(incluyendo el ID de empleado) excepto el ID de la publicación.
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publicacion'
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicacion'
 *       404:
 *         description: Publicación no encontrada
 */
router.put('/:id', publicacionCtrl.modificarPublicacion);

/**
 * @swagger
 * /api/publicacion/{id}:
 *   delete:
 *     summary: Elimina una publicación por ID
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
 *       404:
 *         description: Publicación no encontrada
 */
router.delete('/:id', publicacionCtrl.eliminarPublicacion);

module.exports = router;