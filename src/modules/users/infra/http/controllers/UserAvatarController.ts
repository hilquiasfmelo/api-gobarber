import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const filename = request.file?.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id,
      avatar_filename: String(filename),
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export { UserAvatarController };
