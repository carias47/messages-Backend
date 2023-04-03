import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeModule } from './mensaje/mensaje.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MensajeEntity } from './mensaje/mensaje.entity';
import { UsuarioEntity } from './usuario/usuario.entity';

@Module({
  imports: [
    MensajeModule,
    UsuarioModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'wires_db',
        entities: [MensajeEntity, UsuarioEntity],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
