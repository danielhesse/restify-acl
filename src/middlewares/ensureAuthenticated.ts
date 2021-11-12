/* eslint-disable consistent-return */
import { verify } from 'jsonwebtoken';
import { Next, Request, RequestHandler, Response } from 'restify';
import { UnauthorizedError } from 'restify-errors';

interface ITokenPayload {
  sub: string;
}

export const ensureAuthenticated: RequestHandler = (
  request: Request,
  _: Response,
  next: Next,
) => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    return next(new UnauthorizedError('Token is missing!'));
  }

  const [, token] = authHeaders.split(' ');

  try {
    const decoded = verify(token, String(process.env.SECRET_JWT));

    const { sub: userId } = decoded as ITokenPayload;

    request.username = userId;

    next();
  } catch {
    next(new UnauthorizedError('Invalid credentials!'));
  }
};
