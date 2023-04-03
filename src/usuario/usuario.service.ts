import { MessageDto } from './../common/message.dto';

import { UsuarioEntity } from './usuario.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto } from './dto/create-user-dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async getall(): Promise<UsuarioEntity[]> {
    const usuarios = await this.usuarioRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('no hay usuarios en la lista'),
      );
    return usuarios;
  }

  async create(dto: CreateUsuarioDto): Promise<any> {
    const { nombreUsuario, email } = dto;
    const exists = await this.usuarioRepository.findOne({
      where: [{ nombreUsuario: nombreUsuario }, { email: email }],
    });
    if (exists)
      throw new BadRequestException(new MessageDto('ese usuario ya existe'));

    const user = this.usuarioRepository.create(dto);

    await this.usuarioRepository.save(user);
    return new MessageDto('user creado');
  }
}
