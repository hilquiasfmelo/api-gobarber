import { ListProvidersService } from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute(user_id);

    return response.status(200).json(providers);
  }
}

export { ListProvidersController };
