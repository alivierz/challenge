import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import * as firebase from 'firebase/auth';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        console.log('Authorization header not provided.');
        throw new UnauthorizedException('Authorization header not provided.');
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        console.log('Invalid authorization format. Expected "Bearer <token>".');

        throw new UnauthorizedException(
          'Invalid authorization format. Expected "Bearer <token>".',
        );
      }

      const auth = firebase.getAuth();
      const user: any = await firebase
        .signInWithCustomToken(auth, token)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          return user.uid;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage: string = error.message;
          throw new UnauthorizedException(errorMessage);
        });

      req.body.userId = user;
      req.query.userId = user;

      next();
    } catch (error) {
      throw error;
    }
  }
}
