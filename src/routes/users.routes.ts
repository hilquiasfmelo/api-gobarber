import { instanceToInstance } from 'class-transformer';
import { Router } from 'express';
import { CreateUsersService } from '../services/CreateUsersService';

const usersRouter = Router();

// Criação de Users
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUsersService = new CreateUsersService();

    const user = await createUsersService.execute({ name, email, password });

    return response.status(201).json(instanceToInstance(user));
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
  }
});

export { usersRouter };
