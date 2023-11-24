import { Router } from 'express'
import controller from './../controllers/home.controller'

const router = Router()

router.get('/', controller.index)
router.get('/add-flash', controller.addFlash)

export default router
