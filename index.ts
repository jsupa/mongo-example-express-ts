import mongoose from 'mongoose'
import { consola } from 'consola'

import config from './config/config'
import server from './lib/server'

import './prototypes/string.extension'

const init = async () => {
  consola.info('Initializing Application')

  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(config.mongoUri)

    consola.success('Connection has been established successfully.')

    server.setup()
    server.init()
    server.start()
  } catch (error) {
    consola.error(error)
  }
}

init()
