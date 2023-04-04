import { MensajeService } from './mensaje.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MensajeDto } from './dto/mensaje.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetPrincipal } from 'src/decorators/get-principal.decorator';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@GetPrincipal() user: any) {
    return await this.mensajeService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.mensajeService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: MensajeDto) {
    return await this.mensajeService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.mensajeService.delete(id);
  }
}
