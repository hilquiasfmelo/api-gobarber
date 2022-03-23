import { Router } from 'express';

import { ensuredAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { AppointmentsController } from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

// Todas as rotas abaixo precisam necessitam de autenticação
appointmentsRouter.use(ensuredAuthenticated);

// Criação de Appoitments
appointmentsRouter.post('/', new AppointmentsController().create);

export { appointmentsRouter };
