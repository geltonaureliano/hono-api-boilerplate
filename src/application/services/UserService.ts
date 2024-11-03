import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from '../dtos/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(dto: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User(null, dto.name, dto.email, hashedPassword, dto.phone);
    return await this.userRepository.create(user);
  }

  async login(dto: LoginUserDTO): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  async updateProfile(userId: number, dto: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = Object.assign(user, dto);
    return await this.userRepository.update(updatedUser);
  }
}
