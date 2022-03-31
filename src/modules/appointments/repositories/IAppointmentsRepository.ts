import { Appointment } from '../infra/typeorm/entities/Appointment';
import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';
import { IFindAllInMonthProviderDTO } from '../dtos/IFindAllInMonthProviderDTO';
import { IFindAllInDayFromProviderDTO } from '../dtos/IFindAllInDayFromProviderDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}

export { IAppointmentsRepository };
