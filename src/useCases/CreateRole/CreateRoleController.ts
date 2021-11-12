import { Request, Response } from 'restify';

import { CreateRole } from './CreateRole';

class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createRole = new CreateRole();

    const result = await createRole.execute({
      name,
      description,
    });

    return response.json(result);
  }
}

export { CreateRoleController };
