import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import {
  ActiveCourseValidation,
  AddCourseValidation,
  CompleteCourseValidation,
} from '../validators';
import { IsArray } from 'sequelize-typescript';

export class addCourseToUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  @Validate(AddCourseValidation)
  readonly courses: Array<any>;
}

export class completeCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Validate(CompleteCourseValidation)
  readonly courseId: number;
}

export class activeCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Validate(ActiveCourseValidation)
  readonly courseId: number;
}
