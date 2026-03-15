import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.account.findFirst({
      where: { id, userId },
    });
  }

  async create(data: any, userId: string) {
    return this.prisma.account.create({
      data: { ...data, userId },
    });
  }
}
