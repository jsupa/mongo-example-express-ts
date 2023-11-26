import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: process.env.npm_package_name as string,
      version: process.env.npm_package_version as string,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/api/*.router.ts'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs
