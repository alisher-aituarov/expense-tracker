import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { DBService } from 'src/services/db.service';

@Module({
  imports: [],
  controllers: [RecordsController],
  providers: [RecordsService, DBService],
})
export class RecordsModule {}
