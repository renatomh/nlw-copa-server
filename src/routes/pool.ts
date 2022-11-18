import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function poolRoutes(fastify: FastifyInstance) {
  // Creating the route to count the number of created pools
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  // Route to create a new pool
  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase();

    try {
      /* If an authenticated user created the pool */
      await request.jwtVerify();
      await prisma.pool.create({
        data: {
          title, 
          code,
          ownerId: request.user.sub,

          /* We already create the participant object */
          participants: {
            create: {
              userId: request.user.sub,
            }
          }
        }
      });
    } catch {
      /* Otherwise */
      await prisma.pool.create({
        data: {
          title, 
          code,
        }
      });
    }

    return reply.status(201).send({ code });
  });

  // Route to join a pool
  fastify.post('/pools/join', {
    onRequest: [authenticate]
  }, async (request, reply) => {
    const joinPoolBody = z.object({
      code: z.string(),
    });

    const { code } = joinPoolBody.parse(request.body);

    /* Checking if pool exists */
    const pool = await prisma.pool.findUnique({
      where: {
        code,
      },
      /* Checking if user has already joined the pool */
      include: {
        participants: {
          where: {
            userId: request.user.sub,
          }
        }
      }
    });

    if (!pool) {
      return reply.status(400).send({
        message: 'Pool not found.'
      })
    }

    if (pool.participants.length > 0) {
      return reply.status(400).send({
        message: "You've already joined this pool."
      })
    }

    /* If pool has no owner, user will be set as the pool owner */
    if (!pool.ownerId) {
      await prisma.pool.update({
        where: {
          id: pool.id,
        },
        data: {
          ownerId: request.user.sub,
        }
      });
    }

    /* Creating new participant for the pool */
    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub,
      }
    });

    return reply.status(201).send();
  });

  // Route to get user pools
  fastify.get('/pools', {
    onRequest: [authenticate]
  }, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub,
          }
        }
      },
      include: {
        // Getting number of participantes
        _count: {
          select: {
            participants: true,
          }
        },
        // Getting avatar for the first 4 participants
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              }
            }
          },
          take: 4,
        },
        // Getting info about the pool owner
        owner: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    });

    return { pools };
  });

  // Route to get pool participants
  fastify.get('/pools/:id', {
    onRequest: [authenticate]
  }, async (request) => {
    const getPoolParams = z.object({
      id: z.string(),
    });

    const { id } = getPoolParams.parse(request.params);

    const pool = await prisma.pool.findUnique({
      where: {
        id
      },
      include: {
        // Getting number of participants
        _count: {
          select: {
            participants: true,
          }
        },
        // Getting avatar for the first 4 participants
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              }
            }
          },
          take: 4,
        },
        // Getting info about the pool owner
        owner: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    });

    return { pool }
  });

  // Route to get pool ranking
  fastify.get('/pools/:id/ranking', {
    onRequest: [authenticate],
  }, async (request) => {
    const getPoolParams = z.object({
      id: z.string(),
    })
    const { id } = getPoolParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: {
        id,
      },
      include: {
        // Getting number of participants
        _count: {
          select: {
            participants: true,
          }
        },
        // Getting participants data, including score
        participants: {
          orderBy: {
            score: 'desc',
          },
          select: {
            id: true,
            score: true,
            user: {
              select: {
                avatarUrl: true,
              }
            }
          },
        },
      }
    })
    
    return { pool }
  })
};
