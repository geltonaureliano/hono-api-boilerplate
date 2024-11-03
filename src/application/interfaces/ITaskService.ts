import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/task';
import { Task } from '../../domain/entities/Task';

export interface ITaskService {
  createTask(dto: CreateTaskDTO): Promise<Task>;
  getTasksByUser(userId: number): Promise<Task[]>;
  updateTask(dto: UpdateTaskDTO): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}