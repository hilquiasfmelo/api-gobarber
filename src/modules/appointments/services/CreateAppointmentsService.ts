import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import { Appointment } from '../infra/typeorm/entities/Appointment';

interface IRequestProps {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppoitmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id,
    provider_id,
    date,
  }: IRequestProps): Promise<Appointment> {
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

    const user = await this.usersRepository.findById(provider_id);

    if (!user) {
      throw new AppError('This service provider does not exist', 404);
    }

    if (user.id === user_id) {
      throw new AppError('You cannot create appointments for yourself', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export { CreateAppoitmentsService };
