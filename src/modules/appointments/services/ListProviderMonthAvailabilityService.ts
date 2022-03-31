import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInMonthFromProvider({
        provider_id,
        month,
        year,
      });

    // Pega o numéro de dias no mês
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // Cria um array de dias do mês [1,2,3,4,5,6,7,8,9...]
    const eachDayArray = Array.from(
      // Temos que dizer qual o tamanho do array
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const avaibility = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        // Verifica se existe algum agendamento nesse dia específico
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return avaibility;
  }
}

export { ListProviderMonthAvailabilityService };
