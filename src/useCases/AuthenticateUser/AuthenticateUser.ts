import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from 'restify-errors';

import { UsersRepository } from '../../repositories';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUser {
  async execute({ email, password }: IRequest) {
    const userExists = await UsersRepository().findOne({ email });

    if (!userExists) {
      return new BadRequestError('Users does not exists!');
    }

    const passwordMatched = await compare(password, userExists.password);

    if (!passwordMatched) {
      return new BadRequestError('User or password is incorrect!');
    }

    const token = sign({}, String(process.env.SECRET_JWT), {
      subject: userExists.id,
      expiresIn: String(process.env.EXPIRES_IN_JWT),
    });

    return { token };
  }
}

export { AuthenticateUser };
