import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from '../dtos/user';
import { User } from '../../domain/entities/User';

export interface IUserService {
  register(dto: CreateUserDTO): Promise<User>;
  login(dto: LoginUserDTO): Promise<{ user: User; token: string }>;
  updateProfile(userId: number, dto: UpdateUserDTO): Promise<User>;
}