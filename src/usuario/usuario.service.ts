import { MessageDto } from './../common/message.dto';

import { UsuarioEntity } from './usuario.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto } from './dto/create-user-dto';
import { LoginUsuarioDto } from './dto/login-dto';
import { compare } from 'bcryptjs';
import { CustomInterface } from './strategies/custom.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
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
    return new MessageDto('Usuario creado');
  }

  async login(dto: LoginUsuarioDto): Promise<any> {
    const { nombreUsuario } = dto;
    const usuario = await this.usuarioRepository.findOne({
      where: [{ nombreUsuario: nombreUsuario }, { email: nombreUsuario }],
    });
    if (!usuario)
      return new UnauthorizedException(new MessageDto('No existe el usuario.'));

    const password = await compare(dto.password, usuario.password);

    if (!password)
      return new UnauthorizedException(
        new MessageDto('Contraseña incorrecta.'),
      );
    const payload: CustomInterface = {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
