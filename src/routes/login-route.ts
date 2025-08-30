import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/login',
    {
      schema: {
        summary: 'User authentication',
        description: 'Authenticate user into the system',
        tags: ['Auth'],

        body: z.object({
          email: z.email().describe('User email'),
          password: z.string().describe('User password')
        }),

        response: {
          201: z
            .object({
              message: z.string().default('Login successful'),
              token: z.string().describe('JWT access token')
            })
            .describe('Successful login response'),
          400: z
            .object({
              message: z.string().describe('Error message'),
              field: z.string().describe('Field name')
            })
            .describe('Validation fails'),
          401: z
            .object({
              error: z.string().default('Invalid credentials')
            })
            .describe('Email or password incorrect')
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body

      if (email === 'teste@gmail.com' && password === '123456') {
        reply.status(201).send({
          message: 'Login successful',
          token: 'jwt-token-placeholder'
        })
        return
      }

      reply.status(401).send({
        error: 'Invalid credentials'
      })
    }
  )
}
