import { hash } from 'bcryptjs';
import { BadRequestError } from 'restify-errors';

import { UsersRepository } from '../../repositories';

interface IRequest {
  username: string;
  email: string;
  password: string;
}

class CreateUser {
  async execute({ username, email, password }: IRequest) {
    const existingUser = await UsersRepository().findOne({ email });

    if (existingUser) {
      return new BadRequestError('User already exists!');
    }

    const passwordHashed = await hash(password, 8);

    const user = UsersRepository().create({
      username,
      email,
      password: passwordHashed,
    });

    await UsersRepository().save(user);

    return user;
  }
}

export { CreateUser };
