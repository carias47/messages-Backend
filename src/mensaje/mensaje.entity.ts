import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mensaje' })
export class MensajeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  titulo: string;

  @Column({ type: 'varchar', length: 750, nullable: false })
  descripcion: string;

  @Column({ type: 'timestamp', nullable: false })
  fecheCreate?: Date;
}
