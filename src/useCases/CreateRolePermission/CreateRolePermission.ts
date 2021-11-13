import { BadRequestError } from 'restify-errors';

import { PermissionsRepository, RolesRepository } from '../../repositories';

interface IRequest {
  roleId: string;
  permissions: string[];
}

class CreateRolePermission {
  async execute({ roleId, permissions }: IRequest) {
    const roleExists = await RolesRepository().findOne(roleId);

    if (!roleExists) {
      return new BadRequestError('Role does not exists!');
    }

    const role = roleExists;

    const permissionsExists = await PermissionsRepository().findByIds(
      permissions,
    );

    role.permissions = permissionsExists;

    await RolesRepository().save(role);

    return role;
  }
}

export { CreateRolePermission };
