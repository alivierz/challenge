import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ListModule } from './modules/list/list.module';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './db/database.providers';
import { OperationModule } from './modules/operation/operation.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    ListModule,
    OperationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).exclude('v1/auth/(.*)').forRoutes('*');
  }
}
