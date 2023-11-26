import { Router } from 'express'

import homeRouter from './../routes/home.router'

import pingRouter from './../routes/api/ping.router'
import timeRouter from './../routes/api/time.router'
import loginRouter from './../routes/api/login.router'

const routes = Router()

routes.use('/', homeRouter)

routes.use('/api', pingRouter)
routes.use('/api', timeRouter)
routes.use('/api/login', loginRouter)

export default routes
