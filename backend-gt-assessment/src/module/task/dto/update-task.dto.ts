import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
   
}

export class UpdateTaskStatusDto {
     @ApiProperty({
        example:"high",
      })
    @IsEnum(TaskStatus)
    status: TaskStatus;
}