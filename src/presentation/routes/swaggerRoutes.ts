import { Hono } from 'hono';

// Swagger
import { swaggerSpec } from '../../infrastructure/docs/swagger';

export const swaggerRoutes = (app: Hono) => {

  app.get('/swagger.json', (c) => {
      return c.json(swaggerSpec);
  });

};