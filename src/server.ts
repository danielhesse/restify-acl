import restify from 'restify';

import { routes } from './routes';

const server = restify.createServer();

routes(server);

server.listen(8080, () => {
  console.log('🚀 Server running on port 8080!');
});
