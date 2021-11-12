import { BadRequestError } from 'restify-errors';

import { PermissionsRepository } from '../../repositories';

interface IRequest {
  name: string;
  description: string;
}

class CreatePermission {
  async execute({ name, description }: IRequest) {
    const permissionExists = await PermissionsRepository().findOne({ name });

    if (permissionExists) {
      return new BadRequestError('Role already exists!');
    }

    const permission = PermissionsRepository().create({
      name,
      description,
    });

    await PermissionsRepository().save(permission);

    return permission;
  }
}

export { CreatePermission };
