import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { SessionsController } from '../controllers/SessionController';

const sessionsRouter = Router();

// Criação de Users
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  new SessionsController().create,
);

export { sessionsRouter };
