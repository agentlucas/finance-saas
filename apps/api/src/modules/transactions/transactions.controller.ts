import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@Request() req) {
    return this.transactionsService.findAll(req.user.id);
  }

  @Post()
  create(@Body() body: any, @Request() req) {
    return this.transactionsService.create(body, req.user.id);
  }
}
