import { BadRequestError } from 'restify-errors';

import {
  PermissionsRepository,
  RolesRepository,
  UsersRepository,
} from '../../repositories';

interface IRequest {
  userId: string;
  roles: string[];
  permissions: string[];
}

class CreateAccessControlList {
  async execute({ userId, roles, permissions }: IRequest) {
    const userExists = await UsersRepository().findOne(userId);

    if (!userExists) {
      return new BadRequestError('User does not exists!');
    }

    const user = userExists;

    const permissionsExists = await PermissionsRepository().findByIds(
      permissions,
    );

    const rolesExists = await RolesRepository().findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    await UsersRepository().save(user);

    return user;
  }
}

export { CreateAccessControlList };
