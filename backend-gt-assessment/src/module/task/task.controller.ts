import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { currentUser } from './decorator/auth.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskStatusDto } from './dto/update-task.dto';

import { TaskService } from './task.service';

@ApiTags('Tasks')
@ApiHeader({
  name: 'x-user-id',
  description: 'Authenticated user ID',
  required: true,
})
@Controller('tasks')

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: 'Create a new task',
  })
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @currentUser() currentUserId: number,
  ) {
    return this.taskService.create(createTaskDto, +currentUserId);
  }

  @ApiOperation({
    summary: 'Get all tasks',
  })
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @ApiOperation({
    summary: 'Get single task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @currentUser() currentUserId: string,
  ) {
    return this.taskService.update(+id, updateTaskDto, +currentUserId);
  }

  @ApiOperation({
    summary: 'Update task status',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @currentUser() currentUserId: string,
  ) {
    return this.taskService.updateStatus(
      +id,
      updateTaskStatusDto,
      +currentUserId,
    );
  }

  @ApiOperation({
    summary: 'Unassign task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Patch(':id/unassign')
  unassign(@Param('id') id: number, @currentUser() currentUserId: string) {
    return this.taskService.unassign(+id, +currentUserId);
  }

  @ApiOperation({
    summary: 'Delete task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: number, @currentUser() currentUserId: string) {
    return this.taskService.remove(+id, +currentUserId);
  }
}
