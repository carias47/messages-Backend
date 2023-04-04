import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from './../config/constants';
import { UsuarioEntity } from './../usuario/usuario.entity';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './usuario.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, UsuarioRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: 7200,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsuarioService, ConfigService, JwtStrategy],
  controllers: [UsuarioController],
  exports: [PassportModule, JwtStrategy],
})
export class UsuarioModule {}
