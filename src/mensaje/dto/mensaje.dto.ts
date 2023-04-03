import { IsNotEmpty } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class MensajeDto {
  @IsNotBlank({ message: 'El titulo no puede estar vacío' })
  titulo: string;

  @IsNotEmpty()
  @IsNotBlank({ message: 'La descripcion no puede estar vacía' })
  descripcion: string;
}
