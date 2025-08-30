import type { FastifyPluginAsync } from 'fastify'

export const getUsersRoute: FastifyPluginAsync = async (server) => {
  server.get(
    '/users',
    {
      schema: {
        summary: 'Get all users',
        description: 'Retrieve a list of all users',
        tags: ['Users'],
        security: [
          {
            bearerAuth: []
          }
        ],
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              default: 1,
              description: 'Page number for pagination'
            },
            limit: {
              type: 'integer',
              default: 10,
              description: 'Number of users per page'
            }
          }
        },
        response: {
          200: {
            description: 'A list of users',
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['id', 'name', 'email'],
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      example: '123e4567-e89b-12d3-a456-426614174000'
                    },
                    name: {
                      type: 'string',
                      example: 'John Doe'
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john.doe@example.com'
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
          }
        }
      }
    },
    async (_request, reply) => {
      reply.send({
        data: []
      })
    }
  )
}
