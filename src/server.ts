import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'

const app = fastify();

app.register(fastifyCors, { origin: '*' });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Sample API',
      description: 'A sample API to illustrate OpenAPI concepts',
      version: '1.0.0',
    },
  },
});

app.get('/spec.json', () => app.swagger());

export default app;
