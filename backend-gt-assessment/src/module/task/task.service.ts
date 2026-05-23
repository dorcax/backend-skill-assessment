import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskStatusDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  // create task
  async create(createTaskDto: CreateTaskDto, currentUserId: number) {
    try {
      const { title, priority, assignedToId } = createTaskDto;

      if (!currentUserId) {
        throw new ForbiddenException('Missing user id');
      }

      return await this.prisma.task.create({
        data: {
          title,
          priority,

          assignedTo: {
            connect: { id: assignedToId },
          },

          assignedBy: {
            connect: { id: currentUserId },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // find all tasks
  async findAll() {
    try {
      return await this.prisma.task.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // find one task
  async findOne(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return task;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // update task
  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    currentUserId: number,
  ) {
    try {
      const task = await this.findOne(id);

      if (task.assignedById !== currentUserId) {
        throw new ForbiddenException('Only assigner can update task');
      }

      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // update task status
  async updateStatus(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
    currentUserId: number,
  ) {
    try {
      const task = await this.findOne(id);

      if (task.assignedToId !== currentUserId) {
        throw new ForbiddenException('Only assignee can update status');
      }

      return await this.prisma.task.update({
        where: { id },
        data: {
          status: updateTaskStatusDto.status,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // unassign task
  async unassign(id: number, currentUserId: number) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // delete task
  async remove(id: number, currentUserId: number) {
    try {
      const task = await this.findOne(id);

      if (task.assignedById !== currentUserId) {
        throw new ForbiddenException('Only assigner can delete task');
      }

      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
