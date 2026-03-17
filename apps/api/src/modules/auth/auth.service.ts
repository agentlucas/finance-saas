import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async signup(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });

    const { password: _, ...result } = user;
    return {
      user: result,
      access_token: this.jwtService.sign({ 
        sub: user.id, 
        email: user.email, 
        role: user.role 
      }),
    };
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role || 'USER' 
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
