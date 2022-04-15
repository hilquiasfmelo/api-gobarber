import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
      });

    /**
     * Busca todas as horas disponíveis no dia,
     * nesse caso das 8h as 17h.
     */
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    // Pega a data/horário atual
    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      // Verifica se existe um agendamento nesse horário
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      // Verifica se o agendamento já passou da hora atual
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        /**
         * Uma negação aqui no retorno
         * por que se o agendamento vier true coloca false
         * e se vier false coloque true
         */
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
        // isAfter => Verifica se o agendamento é depois da data/horário atual
      };
    });

    return availability;
  }
}

export { ListProviderDayAvailabilityService };
