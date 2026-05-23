import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '@prisma/client';
import { IsEnum, IsInstance, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete backend assessment',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'high',
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  assignedToId: number;
}
