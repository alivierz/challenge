import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { users } from 'src/utils/entity/db.entity';
import { UUIDTypes } from 'uuid';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private usersModel: typeof users,
  ) {}

  async createUserService(
    user: string,
    pass: string,
    id: string,
  ): Promise<boolean> {
    try {
      await firebaseAdmin.auth().createUser({
        uid: id,
        email: `${user}@bankuish.com`,
        displayName: user,
        password: pass,
      });

      await this.usersModel
        .create({
          user_name: user,
          password: pass,
          userid: id,
        })
        .catch((_err) => {
          throw new HttpException(
            {
              type: 'db',
              typeDb: 'pg',
              trackingCode: 'BCASE001',
              data: _err,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });

      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUserByName(name: string): Promise<users> {
    try {
      return this.usersModel
        .findOne({
          where: {
            user_name: name,
          },
          raw: true,
        })
        .catch((_err) => {
          console.log(_err);

          throw new HttpException(
            {
              type: 'db',
              typeDb: 'mongo',
              trackingCode: 'BCASE002',
              data: _err.errorResponse,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  async loginUserController(name: string): Promise<any> {
    try {
      const USER = await this.usersModel
        .findOne({
          where: {
            user_name: name,
          },
          raw: true,
        })
        .catch((_err) => {
          console.log(_err);

          throw new HttpException(
            {
              type: 'db',
              typeDb: 'mongo',
              trackingCode: 'BCASE002',
              data: _err.errorResponse,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });

      const TOKEN = await firebaseAdmin
        .auth()
        .createCustomToken(USER.userid, { premiumAccount: true })
        .then((customToken) => customToken)
        .catch((error) => {
          console.log('Error creating custom token:', error);
          throw error;
        });

      return { user: USER, token: TOKEN };
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(pass: string) {
    try {
      return await hash(pass, 10);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string): Promise<users> {
    try {
      return this.usersModel
        .findOne({
          where: {
            userid: userId,
          },
          raw: true,
        })
        .catch((_err) => {
          throw new HttpException(
            {
              type: 'db',
              typeDb: 'mongo',
              trackingCode: 'BCASE002',
              data: _err.errorResponse,
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  async validateRequest(req: any): Promise<boolean> {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('Authorization header not provided.');
      return false;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      console.log('Invalid authorization format. Expected "Bearer <token>".');
      return false;
    }

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      console.log('Decoded Token:', decodedToken);
      return true;
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        console.error('Token has expired.');
      } else if (error.code === 'auth/invalid-id-token') {
        console.error('Invalid ID token provided.');
      } else {
        console.error('Error verifying token:', error);
      }
      return false;
    }
  }
}
