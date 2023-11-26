import { Router } from 'express'
import controller from './../../controllers/api/login.controller'
import { registerValidator, loginValidator } from '../../validations/login.validator'
import { verifyToken } from '../../lib/helper'

const router = Router()

/**
 * @openapi
 * /api/login/register:
 *   post:
 *     security: []
 *     tags: [Login]
 *     summary: Register
 *     description: User registration
 *     requestBody:
 *      description: User object
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *          password:
 *           type: string
 *     parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: Language
 *        required: false
 *        schema:
 *         type: string
 *     responses:
 *       400:
 *         description: Bad Request, Validation Error
 *       200:
 *         description: Success
 *
 * /api/login/login:
 *   post:
 *     security: []
 *     tags: [Login]
 *     summary: Login
 *     description: User login
 *     requestBody:
 *      description: User object
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *          password:
 *           type: string
 *     parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: Language
 *        required: false
 *        schema:
 *         type: string
 *     responses:
 *       400:
 *         description: Bad Request, Validation Error
 *       200:
 *         description: Success
 *
 * /api/login/renew:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     tags: [Login]
 *     summary: Renew
 *     description: Renew token
 *     parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: Language
 *        required: false
 *        schema:
 *         type: string
 *     responses:
 *       401:
 *         description: Unauthorized
 *       200:
 *         description: Success
 */

router.post('/register', registerValidator, controller.register)
router.post('/login', loginValidator, controller.login)
router.post('/renew', verifyToken, controller.renew)

export default router
