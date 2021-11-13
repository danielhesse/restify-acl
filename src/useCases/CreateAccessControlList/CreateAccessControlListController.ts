import { Request, Response } from 'restify';

import { CreateAccessControlList } from './CreateAccessControlList';

class CreateAccessControlListController {
  async handle(request: Request, response: Response) {
    const { permissions, roles } = request.body;
    const userId = request.username as string;

    const createAccessControlList = new CreateAccessControlList();

    const result = await createAccessControlList.execute({
      userId,
      roles,
      permissions,
    });

    return response.json(result);
  }
}

export { CreateAccessControlListController };
