import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ForgotPasswordUserController } from '../controllers/ForgotPasswordUserController';
import { ResetPasswordUserController } from '../controllers/ResetPasswordUserController';

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  new ForgotPasswordUserController().create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      new_password: Joi.string().required(),
      new_password_confirmation: Joi.string()
        .valid(Joi.ref('new_password'))
        .required(),
    },
  }),
  new ResetPasswordUserController().create,
);

export { passwordRouter };
