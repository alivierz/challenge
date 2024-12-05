import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
