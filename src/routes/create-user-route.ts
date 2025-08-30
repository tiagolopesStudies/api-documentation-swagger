import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

export async function createUserRoute(server: FastifyInstance) {
  server.post(
    '/users',
    {
      schema: {
        summary: 'Create user',
        description: 'Register user on the platform',
        tags: ['Users'],
        security: [
          {
            bearerAuth: []
          }
        ],
        body: {
          type: 'object',
          required: ['name', 'email'],
          examples: [
            {
              name: 'John Doe',
              email: 'john.doe@example.com'
            },
            {
              name: 'Jessica Jones',
              email: 'jessica.jones@example.com'
            }
          ],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        },
        response: {
          201: {
            description: 'User created successfully',
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000'
              }
            }
          },
          400: {
            description: 'Validation fails',
            type: 'object',
            required: ['errors'],
            properties: {
              errors: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['field', 'error'],
                  properties: {
                    field: {
                      type: 'string',
                      example: 'email'
                    },
                    error: {
                      type: 'string',
                      example: 'Email is required'
                    }
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            required: ['error'],
            properties: {
              error: {
                type: 'string',
                example: 'Unauthorized'
              }
            }
          },
          409: {
            description: 'Conflict - Email already exists',
            type: 'object',
            required: ['error'],
            properties: {
              error: {
                type: 'string',
                example: 'Email already exists'
              }
            }
          }
        }
      }
    },
    async (_request, reply) => {
      reply.status(201).send({
        id: randomUUID()
      })
    }
  )
}
