import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import { createUserRoute } from './routes/create-user-route'
import { getUsersRoute } from './routes/get-users-route'

const app = fastify()

app.register(fastifyCors, { origin: '*' })
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Sample API',
      description: 'A sample API to illustrate OpenAPI concepts',
      version: '1.0.0'
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  }
})

app.register(getUsersRoute)
app.register(createUserRoute)

app.get('/openapi.json', () => app.swagger())

app.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
    theme: 'kepler'
  }
})

app
  .listen({
    port: 3000
  })
  .then(() => {
    console.log(
      'Server is running on http://localhost:3000 \nDocumentation is available at http://localhost:3000/docs'
    )
  })

export default app
