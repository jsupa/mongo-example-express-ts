import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.npm_package_name as string,
      version: process.env.npm_package_version as string,
    },
  },
  apis: ['./routes/api/*.router.ts'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs
