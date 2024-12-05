import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { userCoursesProvider } from 'src/db/models.providers';
import { AuthModule } from '../auth/auth.module';
import { ListModule } from '../list/list.module';

@Module({
  providers: [
    OperationService,

    //? DB providers
    userCoursesProvider,
  ],
  controllers: [OperationController],
  imports: [AuthModule, ListModule],
})
export class OperationModule {}
