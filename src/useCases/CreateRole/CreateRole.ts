import { BadRequestError } from 'restify-errors';

import { RolesRepository } from '../../repositories';

interface IRequest {
  name: string;
  description: string;
}

class CreateRole {
  async execute({ name, description }: IRequest) {
    const roleExists = await RolesRepository().findOne({ name });

    if (roleExists) {
      return new BadRequestError('Role already exists!');
    }

    const role = RolesRepository().create({
      name,
      description,
    });

    await RolesRepository().save(role);

    return role;
  }
}

export { CreateRole };
