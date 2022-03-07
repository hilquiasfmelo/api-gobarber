import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppoitmentsService } from '../services/CreateAppointmentsService';

import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Todas as rotas abaixo precisam necessitam de autenticação
appointmentsRouter.use(ensuredAuthenticated);

// Criação de Appoitments
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  // Converte a data em formato Date do JavaScript
  const parsedDate = parseISO(date);

  const createAppointmentsService = new CreateAppoitmentsService();

  const appointment = await createAppointmentsService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

// Listagem de todos os Appoitments
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});

export { appointmentsRouter };
