import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { currentUser } from './decorator/auth.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto ,@currentUser() currentUserId:string) {
    return this.taskService.create(createTaskDto,currentUserId);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@currentUser() currentUserId:string) {
    return this.taskService.update(id, updateTaskDto,currentUserId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@currentUser() currentUserId:string) {
    return this.taskService.updateStatus(id, updateTaskDto,currentUserId);
  }

  @Patch(':id/unassign')
  unassign(@Param('id') id: string, @currentUser() currentUserId: string) {
    return this.taskService.unassign(id, currentUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@currentUser() currentUserId:string) {
    return this.taskService.remove(id,currentUserId);
  }
}
