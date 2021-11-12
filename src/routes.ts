import { Request, Response, Server } from 'restify';

export const routes = (route: Server) => {
  route.get('/contatos', (_: Request, response: Response) => {
    return response.json({ message: 'contatos' });
  });

  route.get('/', (_: Request, response: Response) => {
    return response.json({ message: 'Hello World!' });
  });
};
