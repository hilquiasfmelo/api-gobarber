import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance, classToPlain } from 'class-transformer';

import { AuthenticateUsersService } from '@modules/users/services/AuthenticateUsersService';

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUsersService = container.resolve(
      AuthenticateUsersService,
    );

    const { user, token } = await authenticateUsersService.execute({
      email,
      password,
    });

    return response.status(200).json({ user: instanceToInstance(user), token });
  }
}

export { SessionsController };
