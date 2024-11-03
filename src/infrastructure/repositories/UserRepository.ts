import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { PrismaClient } from '@prisma/client';

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: User): Promise<User> {
    const data = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
      },
    });
    return new User(data.id, data.name, data.email, data.password, data.phone || undefined);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user.id, user.name, user.email, user.password, user.phone || undefined) : null;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new User(user.id, user.name, user.email, user.password, user.phone || undefined) : null;
  }

  async update(user: User): Promise<User> {
    const data = await this.prisma.user.update({
      where: { id: user.id! },
      data: {
        name: user.name,
        password: user.password,
        phone: user.phone,
      },
    });
    return new User(data.id, data.name, data.email, data.password, data.phone || undefined);
  }
}
