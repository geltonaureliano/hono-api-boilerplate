import { Context, Hono } from 'hono';
import { TaskService } from '../../application/services/TaskService';
import { TaskRepository } from '../../infrastructure/repositories/TaskRepository';
import { CreateTaskDTO, UpdateTaskDTO } from '../../application/dtos/task';
import { authMiddleware } from '../middlewares/authMiddleware';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

export const taskRoutes = (app: Hono) => {
  app.post('/tasks', authMiddleware, async (c: Context) => {
    const userId = parseInt(c.get('userId'));
    const dto: CreateTaskDTO = await c.req.json();
    dto.userId = userId;

    try {
      const task = await taskService.createTask(dto);
      return c.json(task);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unknown error occurred' }, 400);
    }
  });
  app.get('/tasks', authMiddleware, async (c: Context) => {
    const userId = parseInt(c.get('userId'));

    if (isNaN(userId)) {
      return c.json({ message: 'Invalid userId' }, 400);
    }

    try {
      const tasks = await taskService.getTasksByUser(userId);
      return c.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unknown error occurred' }, 400);
    }
  });

  app.put('/tasks/:id', authMiddleware, async (c: Context) => {
    const taskId = parseInt(c.req.param('id'));
    const dto: UpdateTaskDTO = await c.req.json();
    dto.id = taskId;

    try {
      const task = await taskService.updateTask(dto);
      return c.json(task);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unknown error occurred' }, 400);
    }
  });

  app.delete('/tasks/:id', authMiddleware, async (c: Context) => {
    const taskId = parseInt(c.req.param('id'));

    try {
      await taskService.deleteTask(taskId);
      return c.json({ message: 'Task deleted' });
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unknown error occurred' }, 400);
    }
  });
};