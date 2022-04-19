import { Router } from 'express';

import { ensuredAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import { AppointmentsController } from '../controllers/AppointmentsController';
import { ListProviderAppointmentsController } from '../controllers/ListProviderAppointmentsController';

const appointmentsRouter = Router();

// Todas as rotas abaixo precisam necessitam de autenticação
appointmentsRouter.use(ensuredAuthenticated);

// Criação de Appoitments
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  new AppointmentsController().create,
);
// Listagem de todos os Appointments do Prestador logado
appointmentsRouter.get('/me', new ListProviderAppointmentsController().index);

export { appointmentsRouter };
