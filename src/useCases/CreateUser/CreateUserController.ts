import { Request, Response } from 'restify';

import { CreateUser } from './CreateUser';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, password } = request.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      username,
      email,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };
