import { TaskPriority } from '@prisma/client';
import { IsString, IsEnum, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsNumber()
  assignedToId: number;
 
}
