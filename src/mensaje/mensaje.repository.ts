import { MensajeEntity } from './mensaje.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MensajeEntity)
export class MensajeRepository extends Repository<MensajeEntity> {}
