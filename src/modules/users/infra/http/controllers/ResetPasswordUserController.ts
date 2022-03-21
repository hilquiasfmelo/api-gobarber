import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserService } from '@modules/users/services/ResetPasswordUserService';

class ResetPasswordUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token, new_password } = request.body;

    const resetPasswordUserService = container.resolve(
      ResetPasswordUserService,
    );

    await resetPasswordUserService.execute({
      token,
      new_password,
    });

    return response.status(204).send();
  }
}

export { ResetPasswordUserController };
