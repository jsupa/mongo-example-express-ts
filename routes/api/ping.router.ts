import { Router } from 'express'
import controller from './../../controllers/api/ping.controller'

const router = Router()

/**
 * @openapi
 * /api/ping:
 *   get:
 *     security: []
 *     tags: [Server]
 *     summary: Ping the server
 *     description: Ping the server
 *     parameters:
 *      - name: Language
 *        in: header
 *        description: Language
 *        required: false
 *        schema:
 *         type: string
 *     responses:
 *       200:
 *         description: pong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */

router.get('/ping', controller.index)

export default router
