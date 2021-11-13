import { Server } from 'restify';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { can, is } from './middlewares/permissions';
import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController';
import { CreateAccessControlListController } from './useCases/CreateAccessControlList/CreateAccessControlListController';
import { CreatePermissionController } from './useCases/CreatePermission/CreatePermissionController';
import { CreateProductController } from './useCases/CreateProduct/CreateProductController';
import { CreateRoleController } from './useCases/CreateRole/CreateRoleController';
import { CreateRolePermissionController } from './useCases/CreateRolePermission/CreateRolePermissionController';
import { CreateUserController } from './useCases/CreateUser/CreateUserController';
import { GetAllProductsController } from './useCases/GetAllProducts/GetAllProductsController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createRoleController = new CreateRoleController();
const createPermissionController = new CreatePermissionController();
const createAccessControlListController =
  new CreateAccessControlListController();
const createRolePermissionController = new CreateRolePermissionController();
const createProductController = new CreateProductController();
const getAllProductsController = new GetAllProductsController();

export const routes = (route: Server) => {
  route.post('/users', createUserController.handle);

  route.post('/authenticate', authenticateUserController.handle);

  route.post('/roles', [
    ensureAuthenticated,
    is(['admin']),
    createRoleController.handle,
  ]);

  route.post('/permissions', [
    ensureAuthenticated,
    createPermissionController.handle,
  ]);

  route.post('/users/acl', [
    ensureAuthenticated,
    createAccessControlListController.handle,
  ]);

  route.post('/roles/:roleId', [
    ensureAuthenticated,
    createRolePermissionController.handle,
  ]);

  route.post('/products', [
    ensureAuthenticated,
    can(['create_product']),
    createProductController.handle,
  ]);

  route.get('/products', [
    ensureAuthenticated,
    can(['list_product']),
    getAllProductsController.handle,
  ]);
};
