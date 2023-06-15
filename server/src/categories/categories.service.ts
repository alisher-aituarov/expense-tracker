import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { DBService } from 'src/services/db.service';

@Injectable()
export class CategoriesService {
  constructor(
    public readonly dbService: DBService,
    private readonly logger: Logger,
  ) {}

  create(data: Prisma.CategoryCreateWithoutOwnerInput, ownerId: number) {
    return this.dbService.category.create({
      data: {
        ...data,
        ownerId,
      },
    });
  }

  read(where: Prisma.CategoryWhereInput) {
    return this.dbService.category.findMany({ where });
  }

  readOne(id: number) {
    return this.dbService.category.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: number, userId: number) {
    try {
      const category = await this.readOne(id);
      if (category.ownerId === userId || userId === undefined) {
        await this.dbService.category.delete({
          where: { id },
        });
        return;
      }
      throw new UnauthorizedException();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  update(): Promise<Category> {
    throw new Error('Not implemented');
  }
}
