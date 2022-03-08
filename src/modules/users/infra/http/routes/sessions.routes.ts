import { Router } from 'express';

import { SessionsController } from '../controllers/SessionController';

const sessionsRouter = Router();

// Criação de Users
sessionsRouter.post('/', new SessionsController().create);

export { sessionsRouter };
