import { Router } from 'express';

import { appointmentsRouter } from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export { routes };
