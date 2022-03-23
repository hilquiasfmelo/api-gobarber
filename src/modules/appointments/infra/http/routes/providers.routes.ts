import { Router } from 'express';

import { ensuredAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ListProvidersController } from '../controllers/ListProvidersController';

const providersRouter = Router();

// Todas as rotas abaixo precisam necessitam de autenticação
providersRouter.use(ensuredAuthenticated);

// Criação de Appoitments
providersRouter.get('/', new ListProvidersController().index);

export { providersRouter };
