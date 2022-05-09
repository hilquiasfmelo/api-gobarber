import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import { CreateAppoitmentsService } from '@modules/appointments/services/CreateAppointmentsService';

class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { provider_id, date } = request.body;

    // Converte a data em formato Date do JavaScript
    // const parsedDate = parseISO(date);

    const createAppointmentsService = container.resolve(
      CreateAppoitmentsService,
    );

    const appointment = await createAppointmentsService.execute({
      provider_id,
      user_id,
      date,
    });

    return response.status(201).json(appointment);
  }
}

export { AppointmentsController };
