import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password ?? '',
    );
    if (isCorrectPassword === false) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async signUp(data: { email: string; password: string; username: string }) {
    const salt = this.configService.get<string>('HASH_SALT');
    const hashedPassword = await bcrypt.hash(data.password, Number(salt));
    return await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
  }
}
