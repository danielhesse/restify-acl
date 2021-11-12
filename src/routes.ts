import { Server } from 'restify';

import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/CreateUser/CreateUserController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

export const routes = (route: Server) => {
  route.post('/users', createUserController.handle);

  route.post('/authenticate', authenticateUserController.handle);
};
