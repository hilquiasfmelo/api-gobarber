import { startOfHour } from 'date-fns';

import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

interface IRequestProps {
  provider: string;
  date: Date;
}

class CreateAppoitmentsService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  execute({ provider, date }: IRequestProps): Appointment {
    /**
     * Reseta o horário para um exato, sem minutos ou segundos.
     * Ex: 12:53:21 para 12:00:00
     */
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already booked.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export { CreateAppoitmentsService };
