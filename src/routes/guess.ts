import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function guessRoutes(fastify: FastifyInstance) {
  // Creating the route to count the number of guesses
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  // Route to make a new guess
  fastify.post('/pools/:poolId/games/:gameId/guesses', {
    onRequest: [authenticate]
  }, async (request, reply) => {
    const createGuessParams = z.object({
      poolId: z.string(),
      gameId: z.string(),
    });

    const { poolId, gameId } = createGuessParams.parse(request.params);

    const createGuessBody = z.object({
      firstTeamPoints: z.number(),
      secondTeamPoints: z.number(),
    });

    const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body);

    /* Checking if participant exists */
    const participant = await prisma.participant.findUnique({
      where: {
        userId_poolId: {
          poolId,
          userId: request.user.sub,
        }
      }
    });

    if (!participant) {
      return reply.status(400).send({
        message: "You're not allowed to create a guess inside this pool."
      })
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      }
    })

    if (!game) {
      return reply.status(400).send({
        message: "Game not found."
      })
    }

    /* Checking if participant has already created a guess for this game in this pool */
    const guess = await prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          participantId: participant.id,
          gameId,
        }
      }
    });

    if (guess) {
      return reply.status(400).send({
        message: "You're already placed a guess for the game in this pool."
      })
    }

    /* User can't place guesses after game's date */
    if (game.date < new Date()) {
      return reply.status(400).send({
        message: "You cannot send guesses after the game date."
      })
    }

    /* Finally, we create the game guess */
    await prisma.guess.create({
      data: {
        gameId,
        participantId: participant.id,
        firstTeamPoints,
        secondTeamPoints,
      }
    })

    return reply.status(201).send();
  });
};
