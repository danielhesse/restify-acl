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
    const existingUser = await UsersRepository().findOne({ email });

    if (!existingUser) {
      return new BadRequestError('Users does not exists!');
    }

    const passwordMatched = await compare(password, existingUser.password);

    if (!passwordMatched) {
      return new BadRequestError('User or password is incorrect!');
    }

    const token = sign({}, String(process.env.SECRET_JWT), {
      subject: existingUser.id,
      expiresIn: String(process.env.EXPIRES_IN_JWT),
    });

    return { token };
  }
}

export { AuthenticateUser };
