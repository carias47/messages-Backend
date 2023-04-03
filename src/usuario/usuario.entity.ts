import { hash } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
  nombreUsuario: string;

  @Column({ type: 'varchar', length: 25, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
