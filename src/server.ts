import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'

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

app.get('/openapi.json', () => app.swagger());

app.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
  }
});

app.listen({
  port: 3000,
}).then(() => {
  console.log('Server is running on http://localhost:3000');
});

export default app;
