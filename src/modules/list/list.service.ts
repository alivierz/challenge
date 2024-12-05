import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { col } from 'sequelize';
import { courses, user_courses, users } from 'src/utils/entity/db.entity';

@Injectable()
export class ListService {
  constructor(
    @Inject('COURSES_MODEL')
    private coursesModel: typeof courses,

    @Inject('USER_COURSES_MODEL')
    private userCourseModel: typeof user_courses,

    @Inject('USER_MODEL')
    private userModel: typeof users,
  ) {}

  async getAllCourses(courses: Array<number> = null) {
    try {
      let WHERE;
      if (courses) {
        WHERE = { id: { [Op.in]: courses } };
      }

      return await this.coursesModel
        .findAll({
          attributes: [
            'id',
            ['courses_name', 'desiredCourse'],
            ['required_course', 'requiredCourse'],
          ],
          where: { ...WHERE },
          raw: true,
        })
        .catch((_err) => {
          throw new HttpException(
            {
              type: 'db',
              trackingCode: 'BCASE001',
              data: _err,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  async getUsersCourses(userId: string) {
    try {
      return await this.userCourseModel
        .findAll({
          attributes: [
            'id',
            ['fk_id_course', 'idCourse'],
            [col('courses.courses_name'), 'courseName'],
            ['is_complete', 'isComplete'],
            ['is_active', 'isActive'],
          ],
          include: [
            { model: this.coursesModel, attributes: [] },
            {
              model: this.userModel,
              attributes: [],
              where: {
                userid: userId,
              },
            },
          ],
          raw: true,
        })
        .catch((_err) => {
          throw new HttpException(
            {
              type: 'db',
              trackingCode: 'BCASE001',
              data: _err,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  async listUserCourses(userId: string) {
    try {
      return await this.userCourseModel
        .findAll({
          attributes: [
            'id',
            [col('courses.courses_name'), 'courseName'],
            [col('courses.required_course'), 'requiredCourse'],
            ['is_complete', 'isComplete'],
            ['is_active', 'isActive'],
          ],
          include: [
            { model: this.coursesModel, attributes: [] },
            {
              model: this.userModel,
              attributes: [],
              where: {
                userid: userId,
              },
            },
          ],
          raw: true,
          order: [[col('courses.id'), 'ASC']],
        })
        .catch((_err) => {
          throw new HttpException(
            {
              type: 'db',
              trackingCode: 'BCASE001',
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
