import { ITaskService } from '../interfaces/ITaskService';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/task';

export class TaskService implements ITaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    const task = new Task(null, dto.title, dto.description ?? null, dto.status, dto.userId);
    return await this.taskRepository.create(task);
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    return await this.taskRepository.findByUserId(userId);
  }

  async updateTask(dto: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findById(dto.id);
    if (!task) {
      throw new Error('Task not found');
    }

    const updatedTask = Object.assign(task, dto);
    return await this.taskRepository.update(updatedTask);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
