import { Router } from 'express'

import homeRouter from './../routes/home.router'

const routes = Router()

routes.use('/', homeRouter)

export default routes
