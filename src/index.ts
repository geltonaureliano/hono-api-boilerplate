import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import dotenv from 'dotenv';

// Middlewares
import { loggerMiddleware } from './presentation/middlewares/loggerMiddleware';
import { errorMiddleware } from './presentation/middlewares/errorMiddleware';

// Routes
import { userRoutes } from './presentation/routes/userRoutes';
import { taskRoutes } from './presentation/routes/taskRoutes';
import { swaggerRoutes } from './presentation/routes/swaggerRoutes';

dotenv.config();

const app = new Hono();

app.use('*', loggerMiddleware);
app.use('*', errorMiddleware);

userRoutes(app);
taskRoutes(app);
swaggerRoutes(app);

app.get('/', (c) => c.text('Welcome to Hono.js App'));

serve({
  fetch: app.fetch,
  port: 3000
});