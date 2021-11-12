import { Request, Response } from 'restify';

import { CreatePermission } from './CreatePermission';

class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createPermission = new CreatePermission();

    const result = await createPermission.execute({
      name,
      description,
    });

    return response.json(result);
  }
}

export { CreatePermissionController };
