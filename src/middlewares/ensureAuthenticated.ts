import { verify } from 'jsonwebtoken';
import { Next, Request, Response } from 'restify';
import { UnauthorizedError } from 'restify-errors';

interface ITokenPayload {
  sub: string;
}

interface IRestifyRequest extends Request {
  user: {
    id: string;
  };
}

export const ensureAuthenticated = () => {
  return async (request: IRestifyRequest, _: Response, next: Next) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      return new UnauthorizedError('Token is missing!');
    }

    const [, token] = authHeaders.split(' ');

    try {
      const decoded = verify(token, String(process.env.SECRET_TOKEN));

      const { sub: userId } = decoded as ITokenPayload;

      request.user = {
        id: userId,
      };

      return next();
    } catch {
      return new UnauthorizedError('Invalid token!');
    }
  };
};
