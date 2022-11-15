import '@fastify/jwt';

// JWT typing
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
      avatarUrl: string;
    }
  }
};

// Environemnt variables typing
declare module 'fastify' {
  interface FastifyInstance {
    config: {
        SECRET: string,
    };
  }
};
