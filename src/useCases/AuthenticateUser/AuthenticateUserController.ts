import { Request, Response } from 'restify';

import { AuthenticateUser } from './AuthenticateUser';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUser();

    const result = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(result);
  }
}

export { AuthenticateUserController };
