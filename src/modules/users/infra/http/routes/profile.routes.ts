import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { UpdateProfileUserController } from '../controllers/UpdateProfileUserController';

import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

profileRouter.use(ensuredAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  new UpdateProfileUserController().update,
);
profileRouter.get('/', new UpdateProfileUserController().show);

export { profileRouter };
