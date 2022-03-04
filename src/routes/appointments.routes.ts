import { Router } from 'express';
import { parseISO } from 'date-fns';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppoitmentsService } from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

// Criação de Appoitments
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    // Converte a data em formato de Date do JavaScript
    const parsedDate = parseISO(date);

    const createAppointmentsService = new CreateAppoitmentsService(
      appointmentsRepository,
    );

    const appointment = createAppointmentsService.execute({
      provider,
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
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAppointments();

  return response.status(200).json(appointments);
});

export { appointmentsRouter };
