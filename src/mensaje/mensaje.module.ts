import { MensajeEntity } from './mensaje.entity';
import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MensajeEntity])],
  providers: [MensajeService],
  controllers: [MensajeController],
})
export class MensajeModule {}
