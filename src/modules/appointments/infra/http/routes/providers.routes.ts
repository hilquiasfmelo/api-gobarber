import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  new ListProviderMonthAvailabilityController().index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  new ListProviderDayAvailabilityController().index,
);

export { providersRouter };
