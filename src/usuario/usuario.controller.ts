import { CreateUsuarioDto } from './dto/create-user-dto';
import { LoginUsuarioDto } from './dto/login-dto';
import { UsuarioService } from './usuario.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getAll() {
    return this.usuarioService.getall();
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('nuevo')
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('login')
  login(@Body() dto: LoginUsuarioDto) {
    return this.usuarioService.login(dto);
  }
}
