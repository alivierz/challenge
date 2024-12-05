import { HttpException, Injectable } from '@nestjs/common';
import { compare, compareSync } from 'bcrypt';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AuthService } from 'src/modules/auth/auth.service';
import { ListService } from 'src/modules/list/list.service';
@ValidatorConstraint({ name: 'user_name', async: true })
@Injectable()
export class UserExistValidation implements ValidatorConstraintInterface {
  constructor(private authServices: AuthService) {}

  async validate(value: string, args: any): Promise<boolean> {
    try {
      const USER = await this.authServices
        .getUserByName(value)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCAVE001',
              errorData: _err.response,
            },
            _err.status,
          );
        });

      if (USER) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Username already exist`;
  }
}

@ValidatorConstraint({ name: 'password', async: true })
@Injectable()
export class UserPasswordValidation implements ValidatorConstraintInterface {
  constructor(private authServices: AuthService) {}

  async validate(value: string, args: any): Promise<boolean> {
    try {
      const USER = args.object.user_name;
      const USERP = args.object.password;

      const USER_DATA = await this.authServices
        .getUserByName(USER)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCAVE001',
              errorData: _err.response,
            },
            _err.status,
          );
        });

      const COMPARE = compareSync(USERP, USER_DATA.password);

      if (COMPARE) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Incorrect Password`;
  }
}

@ValidatorConstraint({ name: 'courses', async: true })
@Injectable()
export class AddCourseValidation implements ValidatorConstraintInterface {
  constructor(private listService: ListService) {}

  message: string = 'Error Data';

  async validate(value: Array<any>, args: any): Promise<boolean> {
    try {
      const COURSES = await this.listService.getAllCourses().catch((_err) => {
        throw new HttpException(
          {
            trackingCode: 'BCAVE001',
            errorData: _err.response,
          },
          _err.status,
        );
      });

      const USER_COURSES = await this.listService
        .getUsersCourses(args.object.userId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCAVE001',
              errorData: _err.response,
            },
            _err.status,
          );
        });

      const REPEAT_COURSE = USER_COURSES.filter((data: any) => {
        return value.includes(data.idCourse);
      });

      if (REPEAT_COURSE.length > 0) {
        this.message = 'You already own this course';
        return false;
      }

      let LIMIT_COURSE: any = false;

      value.forEach((element) => {
        const X: any = COURSES.filter((course) => course.id == element)[0];

        if (X.requiredCourse) {
          const VALIDATE = USER_COURSES.find((data: any) => {
            return data.courseName == X.requiredCourse && data.isComplete;
          });

          if (!VALIDATE) {
            LIMIT_COURSE = true;
          }
        }
      });

      if (LIMIT_COURSE) {
        this.message = 'You have courses that require completing other courses';
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return this.message;
  }
}

@ValidatorConstraint({ name: 'courseId', async: true })
@Injectable()
export class CompleteCourseValidation implements ValidatorConstraintInterface {
  constructor(private listService: ListService) {}

  message: string = 'Error Data';

  async validate(value: number, args: any): Promise<boolean> {
    try {
      const USER_COURSES = await this.listService
        .getUsersCourses(args.object.userId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCAVE001',
              errorData: _err.response,
            },
            _err.status,
          );
        });

      const COURSE_TO_APROVE: any = USER_COURSES.filter((data: any) => {
        return value == data.idCourse;
      });

      if (COURSE_TO_APROVE.length <= 0) {
        this.message = 'You do not own this course';
        return false;
      } else if (COURSE_TO_APROVE[0].isComplete) {
        this.message = 'You have already completed this course';
        return false;
      } else if (!COURSE_TO_APROVE[0].isActive) {
        this.message = 'You can only pass the course you are currently taking.';
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return this.message;
  }
}

@ValidatorConstraint({ name: 'courseId', async: true })
@Injectable()
export class ActiveCourseValidation implements ValidatorConstraintInterface {
  constructor(private listService: ListService) {}

  message: string = 'Error Data';

  async validate(value: number, args: any): Promise<boolean> {
    try {
      const USER_COURSES = await this.listService
        .getUsersCourses(args.object.userId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCAVE001',
              errorData: _err.response,
            },
            _err.status,
          );
        });

      const COURSE_TO_ACTIVE: any = USER_COURSES.filter((data: any) => {
        return value == data.idCourse && !data.is_active;
      });

      const COURSE_ACTIVE: any = USER_COURSES.filter((data: any) => {
        return data.isActive;
      });

      if (COURSE_TO_ACTIVE.length <= 0) {
        this.message = 'You do not own this course';
        return false;
      } else if (COURSE_TO_ACTIVE[0].isComplete) {
        this.message = 'You cannot activate completed courses';
        return false;
      }

      if (COURSE_ACTIVE.length > 0) {
        this.message = 'You can only have 1 active course';
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return this.message;
  }
}
