/* eslint-disable consistent-return */
import { Next, Request, RequestHandler, Response } from 'restify';
import { BadRequestError, UnauthorizedError } from 'restify-errors';

import { UsersRepository } from '../repositories';

export const can = (receivedPermissions: string[]): RequestHandler => {
  return async (request: Request, _: Response, next: Next) => {
    const userId = request.username;

    const userExists = await UsersRepository().findOne({
      where: { id: userId },
      relations: ['permissions'],
    });

    if (!userExists) {
      return next(new BadRequestError('User does not exists!'));
    }

    const user = userExists;

    const permissionsExists = user.permissions
      .map(permission => permission.name)
      .some(permission => receivedPermissions.includes(permission));

    if (!permissionsExists) {
      return next(new UnauthorizedError('Unauthorized route!'));
    }

    next();
  };
};

export const is = (receivedRoles: string[]): RequestHandler => {
  return async (request: Request, _: Response, next: Next) => {
    const userId = request.username;

    const userExists = await UsersRepository().findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!userExists) {
      return next(new BadRequestError('User does not exists!'));
    }

    const user = userExists;

    const rolesExists = user.roles
      .map(role => role.name)
      .some(role => receivedRoles.includes(role));

    if (!rolesExists) {
      return next(new UnauthorizedError('Unauthorized route!'));
    }

    next();
  };
};
