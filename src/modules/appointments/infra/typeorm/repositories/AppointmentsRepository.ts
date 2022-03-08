import { getRepository, Repository } from 'typeorm';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';

import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';

import { Appointment } from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointmentsRepository: Repository<Appointment>;

  constructor() {
    this.appointmentsRepository = getRepository(Appointment);
  }
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create({
      provider_id,
      date,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.appointmentsRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export { AppointmentsRepository };
