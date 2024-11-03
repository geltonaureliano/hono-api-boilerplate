import { UserService } from '../../application/services/UserService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };
    userService = new UserService(userRepository);
  });

  describe('register', () => {
    it('deve registrar um novo usuário', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockImplementation((user: User) => Promise.resolve(user));

      const dto = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      const result = await userService.register(dto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
      expect(result.email).toBe(dto.email);
    });
  });

  // Adicione outros testes para login e updateProfile
});