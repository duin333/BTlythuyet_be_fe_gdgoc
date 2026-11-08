import { Task } from '@database/typeorm/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksQueryDto } from './dto/get-tasks-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(dto);
    return this.taskRepository.save(task);
  }

  findAll(query: GetTasksQueryDto): Promise<Task[]> {
    const where: FindOptionsWhere<Task> = {};
    if (query.isCompleted !== undefined) where.isCompleted = query.isCompleted;
    if (query.category) where.category = query.category;
    return this.taskRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Tasks with ID ${id} not found`);
    return task;
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.taskRepository.delete(id);
    return { message: `Tasks with ID ${id} deleted` };
  }
}