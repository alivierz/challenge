import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import {
  activeCourseDto,
  addCourseToUserDto,
  completeCourseDto,
} from 'src/utils/dto/operation.dto';
import { AuthService } from '../auth/auth.service';
import { AllExeptionFilter } from 'src/utils/core/errors';

@Controller('v1/operation')
export class OperationController {
  constructor(
    private operationServices: OperationService,
    private authServices: AuthService,
  ) {}

  @Post('course')
  @HttpCode(200)
  @UseFilters(AllExeptionFilter)
  async addCourseToUserController(@Body() data: addCourseToUserDto) {
    try {
      const USER_ID = await this.authServices
        .getUserById(data.userId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCOCE001',
              errorData: _err,
            },
            _err.status,
          );
        });

      await this.operationServices
        .addCourseToUserService(USER_ID.id, data.courses)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCOCE002',
              errorData: _err,
            },
            _err.status,
          );
        });

      return {
        trackingCode: 'BCACS002',
        data: true,
        message: 'Course add to user successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('course')
  @HttpCode(200)
  @UseFilters(AllExeptionFilter)
  async CompleteCourseController(@Body() data: completeCourseDto) {
    try {
      const USER_ID = await this.authServices
        .getUserById(data.userId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCOCE001',
              errorData: _err,
            },
            _err.status,
          );
        });

      await this.operationServices
        .completeCourseService(USER_ID.id, data.courseId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCOCE002',
              errorData: _err,
            },
            _err.status,
          );
        });

      return {
        trackingCode: 'BCACS002',
        data: true,
        message: 'Course complete',
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('course/active')
  @HttpCode(200)
  @UseFilters(AllExeptionFilter)
  async activeCourseController(@Body() data: activeCourseDto) {
    try {
      const USER_ID = await this.authServices
        .getUserById(data.userId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCOCE001',
              errorData: _err,
            },
            _err.status,
          );
        });

      await this.operationServices
        .activeCourseService(USER_ID.id, data.courseId)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCOCE003',
              errorData: _err,
            },
            _err.status,
          );
        });

      return {
        trackingCode: 'BCACS003',
        data: true,
        message: 'Course complete',
      };
    } catch (error) {
      throw error;
    }
  }
}
