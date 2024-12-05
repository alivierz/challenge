import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { error } from 'console';

@Controller('v1/list')
export class ListController {
  constructor(private listServices: ListService) {}

  @Get('courses')
  async getAllCoursesController() {
    try {
      const COURSES = await this.listServices.getAllCourses().catch((error) => {
        throw new HttpException(
          {
            trackingCode: 'BCLCE001',
            data: error,
          },
          error.status,
        );
      });

      return {
        trackingCode: 'BCLS001',
        data: COURSES,
        message: 'cursos',
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('user/courses')
  async getUserCoursesController(@Query('userId') userId: string) {
    try {
      const COURSES = await this.listServices
        .listUserCourses(userId)
        .catch((error) => {
          throw new HttpException(
            {
              trackingCode: 'BCLCE002',
              data: error,
            },
            error.status,
          );
        });

      return {
        trackingCode: 'BCLS002',
        data: COURSES,
        message: 'cursos',
      };
    } catch (error) {
      throw error;
    }
  }
}
