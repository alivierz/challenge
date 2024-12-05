import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import {
  coursesProvider,
  userCoursesProvider,
  usersProvider,
} from 'src/db/models.providers';
import {
  ActiveCourseValidation,
  AddCourseValidation,
  CompleteCourseValidation,
} from 'src/utils/validators';

@Module({
  controllers: [ListController],
  providers: [
    ListService,
    //? providers for db
    coursesProvider,
    userCoursesProvider,
    usersProvider,

    //? validators
    AddCourseValidation,
    CompleteCourseValidation,
    ActiveCourseValidation,
  ],
  exports: [ListModule],
})
export class ListModule {}
