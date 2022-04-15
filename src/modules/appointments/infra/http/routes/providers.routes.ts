import { Router } from 'express';

import { ensuredAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { ListProvidersController } from '../controllers/ListProvidersController';
import { ListProviderMonthAvailabilityController } from '../controllers/ListProviderMonthAvailabilityController';
import { ListProviderDayAvailabilityController } from '../controllers/ListProviderDayAvailabilityController';

const providersRouter = Router();

// Todas as rotas abaixo precisam necessitam de autenticação
providersRouter.use(ensuredAuthenticated);

// Criação de Appoitments
providersRouter.get('/', new ListProvidersController().index);

providersRouter.get(
  '/:provider_id/month-availability',
  new ListProviderMonthAvailabilityController().index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  new ListProviderDayAvailabilityController().index,
);

export { providersRouter };
