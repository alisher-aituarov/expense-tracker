import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateRecordDTO } from 'src/DTO/records/createRecord.dto';
import { RecordsService } from './records.service';
import { JwtAccessAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('records')
export class RecordsController {
  constructor(private readonly service: RecordsService) {}

  @Post()
  @UseGuards(JwtAccessAuthGuard)
  async create(
    @Body() data: CreateRecordDTO,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.create(data, Number(req.user.sub));
  }

  @Get()
  @UseGuards(JwtAccessAuthGuard)
  async read(@Req() req: Request & { user: { sub: string } }) {
    const category = req.query.category
      ? String(req.query.category)
      : undefined;
    const dateStart = req.query.date_start || null;
    const dateEnd = req.query.date_end || null;
    return this.service.read(Number(req.user.sub), {
      category,
      dateStart,
      dateEnd,
    });
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAccessAuthGuard)
  async delete(@Req() req: Request & { user: { sub: string } }) {
    return this.service.delete(String(req.query.id), Number(req.user.sub));
  }
}
