interface Config {
  env: string
  port: number
  mongoUri: string
  jwtSecret: string
  session: {
    secret: string
    secure: boolean
    maxAge: number
  }
}

const config = {
  env: 'development',
  port: 3000,
  mongoUri: 'mongodb://127.0.0.1:27017/dev',
  jwtSecret: 'secret',
  session: {
    secret: 'secret',
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}

export default config as Config
