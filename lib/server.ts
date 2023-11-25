import express, { Express, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { consola } from 'consola'
import MongoStore from 'connect-mongo'
import expressLayouts from 'express-ejs-layouts'
import passport from 'passport'
import flash from 'express-flash'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import swagger from './swagger'
import config from './../config/config'
import locals from './locals'
import routes from './../config/routes'
import { setLocaleByRequest } from '../prototypes/string.extension'

class Server {
  private app: Express

  constructor() {
    this.app = express()
  }

  public setup = () => {
    this.setDefaults()
  }

  public init = () => {
    this.app.use('/', routes)

    this.app.use(notFound)
    this.app.use(errorHandler)
  }

  public start = () => {
    try {
      this.app.listen(config.port)
      consola.success(`Server listening: http://localhost:${config.port}`)
    } catch (error) {
      consola.error(error)
    }
  }

  private setDefaults = () => {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      setLocaleByRequest(req)
      next()
    })
    this.app.use(morgan('dev'))
    this.app.get('/ping', (req: Request, res: Response) => res.send('pong'))
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
    this.app.set('trust proxy', true)
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cookieParser(config.session.secret))
    this.app.use(sessionConfig)
    this.app.use(expressLayouts)
    this.app.use(express.static('./public'))
    this.app.set('view engine', 'pug')
    this.app.set('views', './views')
    this.app.set('layout', './template')
    // this.app.use(passport.initialize)
    // this.app.use(passport.session)
    this.app.use(locals)
    this.app.use(flash())
  }
}

const store = MongoStore.create({
  mongoUrl: config.mongoUri,
  collectionName: 'sessions',
})

const sessionConfig = session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.session.secure,
    httpOnly: true,
    maxAge: config.session.maxAge,
  },
  store,
})

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  const error = new Error(`🔍 - Not Found`)
  next(error)
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || 500)

  const url = req.originalUrl || req.url

  req.flash('error', error.message)

  res.render('error', {
    version: process.env.npm_package_version,
    title: 'Error',
    message: error.message,
    error: config.env === 'development' ? error : {},
  })
}

const origin = (req: Request) => req.headers?.referer || req.headers?.origin || false

export default new Server()
