import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppoitmentsService } from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();

// Criação de Appoitments
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    // Converte a data em formato de Date do JavaScript
    const parsedDate = parseISO(date);

    const createAppointmentsService = new CreateAppoitmentsService();

    const appointment = await createAppointmentsService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

// Listagem de todos os Appoitments
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});

export { appointmentsRouter };
