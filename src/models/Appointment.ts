import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuidV4();
    this.provider = provider;
    this.date = date;
  }
}

export { Appointment };
