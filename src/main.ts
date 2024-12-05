import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import * as firebaseAdmin from 'firebase-admin';
import * as fs from 'fs';
import * as firebase from 'firebase/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new HttpException(
          {
            errorData: {
              type: 'format',
              data: validationErrors[0],
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  //firebase ;
  const firebaseKeyFilePath =
    './bankuish-29e0a-firebase-adminsdk-wmb80-4bbf8b8b66.json';
  const firebaseServiceAccount /*: ServiceAccount*/ = JSON.parse(
    fs.readFileSync(firebaseKeyFilePath).toString(),
  );
  if (firebaseAdmin.apps.length === 0) {
    console.log('Initialize Firebase Application.');
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    });

    firebase.initializeApp({
      apiKey: process.env.API_KEY,
      projectId: process.env.PROJECTID,
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
