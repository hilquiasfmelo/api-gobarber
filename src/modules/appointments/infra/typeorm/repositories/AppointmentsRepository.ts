import { getRepository, Raw, Repository } from 'typeorm';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { IFindAllInMonthProviderDTO } from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';

import { IFindAllInDayFromProviderDTO } from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
    // parStart => Se a string nao tiver 2 dígitos, ela preenche no início com zero
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.appointmentsRepository.find({
      where: {
        provider_id,
        // Consulta executada diretamento no banco com o método Raw
        date: Raw(
          dateFielName =>
            // to_char => converte uma informação para String
            `to_char(${dateFielName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    // parStart => Se a string nao tiver 2 dígitos, ela preenche no início com zero
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.appointmentsRepository.find({
      where: {
        provider_id,
        // Consulta executada diretamento no banco com o método Raw
        date: Raw(
          dateFielName =>
            // to_char => converte uma informação para String
            `to_char(${dateFielName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export { AppointmentsRepository };
