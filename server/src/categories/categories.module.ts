import { Logger, Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DBService } from 'src/services/db.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  providers: [CategoriesService, DBService, Logger, UsersService],
  controllers: [CategoriesController],
  exports: [],
})
export class CategoriesModule {}
