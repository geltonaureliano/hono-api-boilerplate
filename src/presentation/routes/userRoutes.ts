import { Context, Hono } from 'hono';

// Services 
import { UserService } from '../../application/services/UserService';

// Repositories
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

// DTOs
import { CreateUserSchema, CreateUserDTO, LoginUserSchema, LoginUserDTO, UpdateUserSchema, UpdateUserDTO } from '../../application/dtos/user';

// Middlewares
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const userRoutes = (app: Hono) => {
  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Registrar um novo usuário
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDTO'
   *     responses:
   *       200:
   *         description: Usuário registrado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Requisição inválida
   */
  app.post('/register', validate(CreateUserSchema), async (c: Context) => {
    const dto: CreateUserDTO = await c.req.json();
    try {
      const user = await userService.register(dto);
      return c.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unexpected error occurred' }, 400);
    }
  });

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Login a user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginUserDTO'
   *     responses:
   *       200:
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request
   */
  app.post('/login', validate(LoginUserSchema), async (c: Context) => {
    const dto: LoginUserDTO = await c.req.json();
    try {
      const result = await userService.login(dto);
      return c.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unexpected error occurred' }, 400);
    }
  });

  /**
   * @swagger
   * /profile:
   *   put:
   *     summary: Update user profile
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDTO'
   */
  app.put('/profile', authMiddleware, validate(UpdateUserSchema), async (c: Context) => {
    const userIdHeader = c.req.header('userId') ?? '';
    const userId = parseInt(userIdHeader);
    const dto: UpdateUserDTO = await c.req.json();

    try {
      const user = await userService.updateProfile(userId, dto);
      return c.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ message: error.message }, 400);
      }
      return c.json({ message: 'An unexpected error occurred' }, 400);
    }
  });
};