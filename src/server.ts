import Fastify from "fastify";
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
const fastifyEnv = require('@fastify/env')

import { poolRoutes } from "./routes/pool";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";

// Environemnt variables schema
const schema = {
  type: 'object',
  required: [ 'SECRET' ],
  properties: {
    SECRET: {
      type: 'string',
      default: ''
    }
  }
};

// Creating the server
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  // Setting application environment
  await fastify
    .register(fastifyEnv, {
      schema: schema
    })
    .ready((err) => {
      if (err) console.error(err)
    });

  // Setting application CORS
  await fastify.register(cors, {
    origin: true,
  });

  // Setting JWT
  await fastify.register(jwt, {
    secret: fastify.config.SECRET,
  });

  // Registering modules routes
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);

  // Setting port and host
  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

// Running the server
bootstrap();
