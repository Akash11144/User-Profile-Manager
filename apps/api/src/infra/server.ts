import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from '../schema/index.js';
import { resolvers } from '../resolvers/index.js';
import { buildContext } from '../resolvers/auth.js';
import { applySecurity } from './security.js';

const app = express();
applySecurity(app);

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(
  '/graphql',
  cors({ origin: process.env.SHARED_DEV_ORIGIN ?? 'http://localhost:5173', credentials: true }),
  express.json(),
  expressMiddleware(server, { context: buildContext })
);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API on http://localhost:${port}/graphql`));
