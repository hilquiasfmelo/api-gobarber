import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

import { AppError } from '../errors/AppError';

interface IRequestProps {
  provider_id: string;
  date: Date;
}

class CreateAppoitmentsService {
  async execute({ provider_id, date }: IRequestProps): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    /**
     * Reseta o horário para um exato, sem minutos ou segundos.
     * Ex: 12:53:21 para 12:00:00
     */
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export { CreateAppoitmentsService };
