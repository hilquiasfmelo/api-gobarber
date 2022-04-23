import { ShowProfileService } from '@modules/users/services/ShowProfileService';
import { UpdateProfileUserService } from '@modules/users/services/UpdateProfileUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateProfileUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute(user_id);

    return response.status(200).json(instanceToInstance(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { name, email, old_password, password } = request.body;

    const updateProfileUserService = container.resolve(
      UpdateProfileUserService,
    );

    const updateUser = await updateProfileUserService.execute({
      name,
      email,
      old_password,
      password,
      user_id,
    });

    return response.status(201).json(instanceToInstance(updateUser));
  }
}

export { UpdateProfileUserController };
