import { Injectable } from '@nestjs/common';
import { CreateRecordDTO } from 'src/DTO/records/createRecord.dto';
import { DBService } from 'src/services/db.service';

@Injectable()
export class RecordsService {
  constructor(private readonly dbService: DBService) {}

  async create(data: CreateRecordDTO, ownerId: number) {
    try {
      return this.dbService.record.create({
        data: {
          amount: data.amount,
          note: data.note,
          type: data.type,
          owner: {
            connect: {
              id: ownerId,
            },
          },
          category: {
            connect: {
              id: data.categoryId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async read(
    userId: number,
    filters: {
      category: string;
      dateStart: any;
      dateEnd: any;
    },
  ) {
    try {
      const categories =
        typeof filters.category !== 'undefined'
          ? filters.category
              .split(',')
              .filter(Number)
              .map((c) => Number(c))
          : undefined;
      const dateStart = filters.dateStart
        ? new Date(filters.dateStart).toISOString()
        : undefined;
      const dateEnd = filters.dateEnd
        ? new Date(filters.dateEnd).toISOString()
        : undefined;
      console.log(filters.category, categories);
      return this.dbService.record.findMany({
        where: {
          ownerId: userId,
          createdAt: {
            gte: dateStart,
            lte: dateEnd,
          },
          categoryId: {
            in: categories,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(idsString: string, userId: number) {
    const ids = idsString.split(',').map((i) => Number(i));
    try {
      await this.dbService.record.deleteMany({
        where: {
          id: {
            in: ids,
          },
          ownerId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
