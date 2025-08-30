import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { loginRoute } from './routes/login-route'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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
  },

  transform: jsonSchemaTransform
})

// app.register(getUsersRoute)
// app.register(createUserRoute)
app.register(loginRoute)

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
