import { v4 as uuidV4 } from 'uuid';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuidV4();
    this.provider = provider;
    this.date = date;
  }
}

export { Appointment };
