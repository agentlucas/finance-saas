import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll(@Request() req) {
    return this.accountsService.findAll(req.user.id);
  }

  @Post()
  create(@Body() body: any, @Request() req) {
    return this.accountsService.create(body, req.user.id);
  }
}
