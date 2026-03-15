import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        account: { userId },
      },
      include: {
        account: true,
        category: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async create(data: any, userId: string) {
    // Verify account belongs to user
    const account = await this.prisma.account.findFirst({
      where: { id: data.accountId, userId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return this.prisma.transaction.create({
      data,
      include: {
        account: true,
        category: true,
      },
    });
  }
}
