import { Router } from 'express'
import controller from './../../controllers/api/time.controller'

const router = Router()

/**
 * @openapi
 * /api/time:
 *   get:
 *     security: []
 *     tags: [Server]
 *     summary: Get the server time
 *     description: Get the server time
 *     responses:
 *       200:
 *         description: The server time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 time:
 *                   type: Date
 *                   example: 2020-01-01T00:00:00.000Z
 */

router.get('/time', controller.index)

export default router
