import { isEqual } from 'date-fns';

import { Appointment } from '../models/Appointment';

interface ICreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointmentRepository: Appointment[];

  constructor() {
    this.appointmentRepository = [];
  }

  public findAppointments(): Appointment[] {
    const appointments = this.appointmentRepository;

    return appointments;
  }

  public findByDate(date: Date): Appointment | undefined {
    const findAppointment = this.appointmentRepository.find(appointment =>
      // Realiza a comparação entre duas datas.
      isEqual(date, appointment.date),
    );

    return findAppointment;
  }

  public create({ provider, date }: ICreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointmentRepository.push(appointment);

    return appointment;
  }
}

export { AppointmentsRepository };
