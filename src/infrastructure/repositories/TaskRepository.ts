import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { PrismaClient } from '@prisma/client';

export class TaskRepository implements ITaskRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(task: Task): Promise<Task> {
    const data = await this.prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId,
      },
    });
    return new Task(data.id, data.title, data.description, data.status, data.userId);
  }

  async findById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    return task ? new Task(task.id, task.title, task.description, task.status, task.userId) : null;
  }

  async findByUserId(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ where: { userId } });
    return tasks.map((t) => new Task(t.id, t.title, t.description, t.status, t.userId));
  }

  async update(task: Task): Promise<Task> {
    const data = await this.prisma.task.update({
      where: { id: task.id! },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
      },
    });
    return new Task(data.id, data.title, data.description, data.status, data.userId);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
