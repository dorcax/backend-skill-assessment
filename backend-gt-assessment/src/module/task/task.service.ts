import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskStatusDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  // create task 
  async create(createTaskDto: CreateTaskDto, currentUserId:number) {
    const { title, priority, assignedToId } = createTaskDto;
  if (!currentUserId) {
    throw new ForbiddenException('Missing user id');
  }

    return await this.prisma.task.create({
      data: {
        title,
        priority,
        assignedTo:{
          connect: { id: assignedToId },
        },
        assignedBy: {
          connect: { id: currentUserId },
        },
      },
    });
  }

  // find all tasks
  async findAll() {
    return await this.prisma.task.findMany();
  }

  // find one task
  async findOne(id:number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // update task
  async update(id: number, updateTaskDto: UpdateTaskDto, currentUserId: number){
    const task = await this.findOne(id);

    if (task.assignedById !== currentUserId) {
      throw new ForbiddenException('Only assigner can update task');
    }

    return await this.prisma.task.update({
      where: { id},
      data: updateTaskDto,
    });
  }

  // update status 
  async updateStatus(id:number, updateTaskStatusDto: UpdateTaskStatusDto, currentUserId:number) {
    const task = await this.findOne(id);

    if (task.assignedToId !== currentUserId) {
      throw new ForbiddenException('Only assignee can update status');
    }

    return await this.prisma.task.update({
      where: { id },
      data: { status: updateTaskStatusDto.status },
    });
  }

  // unassign task to user 
  async unassign(id: number , currentUserId:number) {
  const task = await this.findOne(id);

  if (task.assignedById !== currentUserId) {
    throw new ForbiddenException('Only assigner can unassign task');
  }

  await this.prisma.task.update({
    where: { id },
    data: {
      assignedToId: null,
    },
  });

  return {
    message: 'Task successfully unassigned',
  };
}


  // delete task
  async remove(id: number, currentUserId: number) {
    const task = await this.findOne(id);

    if (task.assignedById !== currentUserId) {
      throw new ForbiddenException('Only assigner can delete task');
    }

    return await this.prisma.task.delete({
      where: { id },
    });
  }
}