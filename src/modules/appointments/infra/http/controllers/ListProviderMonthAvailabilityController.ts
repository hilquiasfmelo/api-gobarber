import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderMonthAvailabilityService } from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ListProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const appointmentsAvailables =
      await listProviderMonthAvailabilityService.execute({
        provider_id,
        month,
        year,
      });

    return response.status(200).json(appointmentsAvailables);
  }
}

export { ListProviderMonthAvailabilityController };
