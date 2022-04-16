import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService';

class ListProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { user_id: provider_id } = request.user;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointmentsAvailables =
      await listProviderAppointmentsService.execute({
        provider_id,
        day,
        month,
        year,
      });

    return response.status(200).json(appointmentsAvailables);
  }
}

export { ListProviderAppointmentsController };
