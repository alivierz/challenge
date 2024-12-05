import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { UserExistValidation, UserPasswordValidation } from '../validators';

export class registerUserDto {
  @IsNotEmpty()
  @IsString()
  @Validate(UserExistValidation)
  readonly user_name: string;

  @Transform((pass) => {
    try {
      const PASS_F: any = pass.value;
      return Buffer.from(PASS_F, 'base64').toString('ascii');
    } catch (error) {
      return false;
    }
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class loginUserDto {
  @IsNotEmpty()
  @IsString()
  readonly user_name: string;

  @Transform((pass) => {
    try {
      const PASS_F: any = pass.value;
      return Buffer.from(PASS_F, 'base64').toString('ascii');
    } catch (error) {
      return false;
    }
  })
  @Validate(UserPasswordValidation)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
