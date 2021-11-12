import { getRepository } from 'typeorm';

import { Permission } from '../entities/Permission';
import { Product } from '../entities/Product';
import { Role } from '../entities/Role';
import { User } from '../entities/User';

export const UsersRepository = () => {
  return getRepository(User);
};

export const RolesRepository = () => {
  return getRepository(Role);
};

export const PermissionsRepository = () => {
  return getRepository(Permission);
};

export const ProductsRepository = () => {
  return getRepository(Product);
};
