import { Task } from '../entities/Task';

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findByUserId(userId: number): Promise<Task[]>;
  update(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
}