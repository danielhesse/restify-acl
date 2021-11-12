import { Request, Server } from 'restify';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController';
import { CreatePermissionController } from './useCases/CreatePermission/CreatePermissionController';
import { CreateRoleController } from './useCases/CreateRole/CreateRoleController';
import { CreateUserController } from './useCases/CreateUser/CreateUserController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createRoleController = new CreateRoleController();
const createPermissionController = new CreatePermissionController();

export const routes = (route: Server) => {
  route.post('/users', createUserController.handle);

  route.post('/authenticate', authenticateUserController.handle);

  route.post('/roles', [ensureAuthenticated, createRoleController.handle]);

  route.post('/permissions', [
    ensureAuthenticated,
    createPermissionController.handle,
  ]);
};
