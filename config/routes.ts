import { Router } from 'express'

import homeRouter from './../routes/home.router'

import pingRouter from './../routes/api/ping.router'
import timeRouter from './../routes/api/time.router'

const routes = Router()

routes.use('/', homeRouter)

routes.use('/api', pingRouter)
routes.use('/api', timeRouter)

export default routes
