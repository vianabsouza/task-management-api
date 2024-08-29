import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    return task;
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find(t => t.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
      // Alternativa:
      // throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return foundTask;
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex(t => t.id === task.id);

    if(taskIndex < 0) {
      throw new NotFoundException(`Task with id ${task.id} not found`);
    }
    return this.tasks[taskIndex] = task;
  }
}
