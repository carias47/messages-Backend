import { IsEmail, IsString, MaxLength } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(15, { message: 'nombre: longitud máxima de 15' })
  nombre: string;

  @IsNotBlank({ message: 'el nombre de usuario no puede estar vacío' })
  @MaxLength(40, { message: 'nombre de usuario: longitud máxima de 40' })
  nombreUsuario: string;

  @IsEmail()
  email: string;

  @IsNotBlank({ message: 'la contraseña del usuario no puede estar vacía' })
  password: string;
}
