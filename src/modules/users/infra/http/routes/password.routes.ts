import { Router } from 'express';

import { ForgotPasswordUserController } from '../controllers/ForgotPasswordUserController';
import { ResetPasswordUserController } from '../controllers/ResetPasswordUserController';

const passwordRouter = Router();

passwordRouter.post('/forgot', new ForgotPasswordUserController().create);
passwordRouter.post('/reset', new ResetPasswordUserController().create);

export { passwordRouter };
