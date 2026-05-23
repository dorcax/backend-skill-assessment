import { TaskPriority } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsString()
  assignedToId: string;
}


