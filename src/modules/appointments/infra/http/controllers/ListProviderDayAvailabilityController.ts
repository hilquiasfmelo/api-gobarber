import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderDayAvailabilityService } from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ListProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const appointmentsAvailables =
      await listProviderDayAvailabilityService.execute({
        provider_id,
        day,
        month,
        year,
      });

    return response.status(200).json(appointmentsAvailables);
  }
}

export { ListProviderDayAvailabilityController };
