import 'reflect-metadata';
import 'dotenv/config';

import restify from 'restify';

import { routes } from './routes';

import './database';

const server = restify.createServer({});

server.use(restify.plugins.bodyParser());

routes(server);

server.listen(8080, () => {
  console.log('🚀 Server running on port 8080!');
});
