import { Router } from 'express';

import { AuthenticateUsersService } from '../services/AuthenticateUsersService';

const sessionsRouter = Router();

// Criação de Users
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUsersService = new AuthenticateUsersService();

    const user = await authenticateUsersService.execute({
      email,
      password,
    });

    return response.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

export { sessionsRouter };
