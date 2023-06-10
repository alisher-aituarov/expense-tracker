import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DBService } from 'src/db.service';

@Module({
  providers: [UsersService, DBService],
  exports: [UsersService],
})
export class UsersModule {}
