import { Router } from 'express';

import { UpdateProfileUserController } from '../controllers/UpdateProfileUserController';

import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

profileRouter.use(ensuredAuthenticated);

profileRouter.put('/', new UpdateProfileUserController().update);
profileRouter.get('/', new UpdateProfileUserController().show);

export { profileRouter };
