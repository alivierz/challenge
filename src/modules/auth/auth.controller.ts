import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto, registerUserDto } from 'src/utils/dto/auth.dto';
import { AllExeptionFilter } from 'src/utils/core/errors';
import { UUIDTypes, v4 as uuidv4 } from 'uuid';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UseFilters(AllExeptionFilter)
  async RegisterUserService(@Body() data: registerUserDto) {
    try {
      const HASH_PASS: any = await this.authService.hashPassword(data.password);

      const USER_ID: UUIDTypes = uuidv4();

      const USER_CREATED = await this.authService
        .createUserService(data.user_name, HASH_PASS, USER_ID)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCACE001',
              errorData: _err,
            },
            _err.status,
          );
        });

      return {
        trackingCode: 'BCACS001',
        data: USER_CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  @HttpCode(200)
  @UseFilters(AllExeptionFilter)
  async LoginUserService(@Body() data: loginUserDto) {
    try {
      const USER = await this.authService
        .loginUserController(data.user_name)
        .catch((_err) => {
          throw new HttpException(
            {
              trackingCode: 'BCACE002',
              errorData: _err,
            },
            _err.status,
          );
        });

      return {
        trackingCode: 'BCACS002',
        data: USER.user.user_name,
        token: USER.token,
        message: 'User login successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
