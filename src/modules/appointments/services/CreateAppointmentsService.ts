import { getHours, isBefore, startOfHour } from 'date-fns';
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

    // Não permite cadastrar em uma data que já passou
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create appointments for yourself', 400);
    }

    // Não é permitido criar um agendamento antes das 8am e depois das 5pm
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You cannot only create appointments between 8am and 5pm',
      );
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export { CreateAppoitmentsService };
