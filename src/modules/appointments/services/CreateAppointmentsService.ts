import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Appointment } from '../infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface IRequestProps {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppoitmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({ provider_id, date }: IRequestProps): Promise<Appointment> {
    /**
     * Reseta o horário para um exato, sem minutos ou segundos.
     * Ex: 12:53:21 para 12:00:00
     */
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export { CreateAppoitmentsService };
