import { Request, Response } from 'restify';

import { CreateRolePermission } from './CreateRolePermission';

class CreateRolePermissionController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const createRolePermission = new CreateRolePermission();

    const result = await createRolePermission.execute({
      roleId,
      permissions,
    });

    return response.json(result);
  }
}

export { CreateRolePermissionController };
