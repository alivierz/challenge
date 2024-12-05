import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { usersProvider } from 'src/db/models.providers';
import {
  UserExistValidation,
  UserPasswordValidation,
} from 'src/utils/validators';

@Module({
  providers: [
    AuthService,
    //? providers for the db
    usersProvider,
    ///? providers for the validation data
    UserExistValidation,
    UserPasswordValidation,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
