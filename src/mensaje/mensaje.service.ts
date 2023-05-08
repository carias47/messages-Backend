import { MensajeDto } from './dto/mensaje.dto';
import { MensajeRepository } from './mensaje.repository';
import { MensajeEntity } from './mensaje.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class MensajeService {
  constructor(
    @InjectRepository(MensajeEntity)
    private mensajeRepository: MensajeRepository,
  ) {}

  async getAll(): Promise<MensajeEntity[]> {
    const list = await this.mensajeRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('la lista está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<MensajeEntity> {
    const publicacion = await this.mensajeRepository.findOne({
      where: { id: id },
    });
    if (!publicacion) {
      throw new NotFoundException(new MessageDto('no existe'));
    }
    return publicacion;
  }

  async findByNombre(titulo: string): Promise<MensajeEntity> {
    const mnsj = await this.mensajeRepository.findOne({
      where: { titulo: titulo },
    });
    return mnsj;
  }

  async create(dto: MensajeDto): Promise<any> {
    const exists = await this.findByNombre(dto.titulo);
    if (exists)
      throw new BadRequestException(new MessageDto('ese titulo ya existe'));
    const mensj = this.mensajeRepository.create(dto);
    await this.mensajeRepository.save(mensj);
    return new MessageDto(`mensaje ${mensj.titulo} creado`);
  }

  async delete(id: number): Promise<any> {
    const mensaje = await this.findById(id);
    await this.mensajeRepository.delete(mensaje);
    return new MessageDto(`Mensaje ${mensaje.titulo} eliminado`);
  }
}
