import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from 'src/DTO/categories/createCategory.dto';
import { JwtAccessAuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly service: CategoriesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAccessAuthGuard)
  async read(@Req() req: Request & { user: { sub: string } }) {
    return this.service.read({ ownerId: Number(req.user.sub) });
  }

  @Get('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async readOne(@Param('id') id) {
    return this.service.readOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAccessAuthGuard)
  @HttpCode(201)
  async create(
    @Body() data: CreateCategoryDTO,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.create({ ...data }, Number(req.user.sub));
  }

  @Delete('/:id')
  @UseGuards(JwtAccessAuthGuard)
  @HttpCode(204)
  async delete(
    @Param('id') id,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.delete(Number(id), Number(req.user.sub));
  }
}
