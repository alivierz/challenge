import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { user_courses } from 'src/utils/entity/db.entity';

@Injectable()
export class OperationService {
  constructor(
    @Inject('USER_COURSES_MODEL')
    private userCourseModel: typeof user_courses,
  ) {}

  async addCourseToUserService(idUser: number, idCourse: number[]) {
    try {
      const USER_COURSES: any = idCourse
        .map((data) => {
          return {
            is_complete: false,
            fk_id_course: data,
            fk_id_user: idUser,
            is_active: false,
          };
        })
        .sort((data) => data.fk_id_course);

      USER_COURSES[0].is_active = true;

      return await this.userCourseModel
        .bulkCreate(USER_COURSES)
        .catch((_err) => {
          throw new HttpException(
            {
              type: 'db',
              typeDb: 'pg',
              trackingCode: 'BCOSE001',
              data: _err,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  async completeCourseService(idUser: number, idCourse: number) {
    try {
      return await this.userCourseModel
        .update(
          {
            is_complete: true,
            is_active: false,
          },
          {
            where: {
              fk_id_course: idCourse,
              fk_id_user: idUser,
            },
          },
        )
        .catch((_err) => {
          console.log(_err);

          throw new HttpException(
            {
              type: 'db',
              typeDb: 'pg',
              trackingCode: 'BCOSE002',
              data: _err,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  async activeCourseService(idUser: number, idCourse: number) {
    try {
      return await this.userCourseModel
        .update(
          {
            is_active: true,
          },
          {
            where: {
              fk_id_course: idCourse,
              fk_id_user: idUser,
            },
          },
        )
        .catch((_err) => {
          console.log(_err);

          throw new HttpException(
            {
              type: 'db',
              typeDb: 'pg',
              trackingCode: 'BCOSE002',
              data: _err,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }
}
