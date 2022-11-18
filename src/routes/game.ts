import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

import { Guess, Game } from '@prisma/client';

// Function to calculate a guess score, based on the game results
const calculateGuessScore = (guess: Guess, game: Game): number => {
  // Initializing the user points
  let points = 0;
  // If game already has a result
  if (game.firstTeamPoints && game.secondTeamPoints) {
    // If participant guesses both team points right
    if (guess.firstTeamPoints === game.firstTeamPoints && guess.secondTeamPoints === game.secondTeamPoints)
      return 5;
    // If participant guesses correctly that there was a draw in the match
    if (guess.firstTeamPoints === guess.secondTeamPoints && game.firstTeamPoints === game.secondTeamPoints)
      points += 3;
    // If participant guesses correctly which team won the match
    if ((guess.firstTeamPoints > guess.secondTeamPoints && game.firstTeamPoints > game.secondTeamPoints) ||
      (guess.firstTeamPoints < guess.secondTeamPoints && game.firstTeamPoints < game.secondTeamPoints))
      points += 2;
    // If participant guesses correctly one of the teams points
    if (guess.firstTeamPoints === game.firstTeamPoints || guess.secondTeamPoints === game.secondTeamPoints)
      points += 1;
  }
  // Returning the user points
  return points;
};

export async function gameRoutes(fastify: FastifyInstance) {
  // Route to get pools games
  fastify.get('/pools/:id/games', {
    onRequest: [authenticate]
  }, async (request) => {
    const getPoolParams = z.object({
      id: z.string(),
    });

    const { id } = getPoolParams.parse(request.params);

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              poolId: id,
            }
          }
        }
      }
    });

    // Returning formatted data
    return {
      games: games.map(game => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined,
        }
      })
    };
  });

  // Route to create a new game
  fastify.post('/games', async (request, reply) => {
    const createGameBody = z.object({
      date: z.string(),
      firstTeamCountryCode: z.string(),
      secondTeamCountryCode: z.string(),
    });

    const { date, firstTeamCountryCode, secondTeamCountryCode } = createGameBody.parse(request.body);

    try {
      /* If an authenticated user created the game */
      await request.jwtVerify();
      const game = await prisma.game.create({
        data: {
          date, firstTeamCountryCode, secondTeamCountryCode
        }
      });

      /* Returning the newly created game to the user */
      return reply.status(201).send({ game });
    } catch {
      /* Otherwise, we inform about the error (only logged in users can create games) */
      return reply.status(401).send({
        message: "You must login to create new games."
      })
    }
  });

  // Route to update a game result
  fastify.put('/games/:id/result', {
    onRequest: [authenticate]
  }, async (request, reply) => {
    const updateGameParams = z.object({
      id: z.string(),
    });

    const updateGameBody = z.object({
      firstTeamPoints: z.number().int().nonnegative().lte(99),
      secondTeamPoints: z.number().int().nonnegative().lte(99),
    });

    const { id } = updateGameParams.parse(request.params);
    const { firstTeamPoints, secondTeamPoints } = updateGameBody.parse(request.body);

    /* Checking if game exists */
    const game = await prisma.game.findUnique({
      where: {
        id,
      }
    })
    if (!game) {
      return reply.status(400).send({
        message: 'Game not found.'
      })
    };

    /* Updating game score */
    const updatedGame = await prisma.game.update({
      where: {
        id,
      },
      data: {
        firstTeamPoints,
        secondTeamPoints,
      }
    });

    /* Getting list of guesses */
    const guesses = await prisma.guess.findMany({
      where: {
        gameId: id,
      }
    });
    /* For each guess in the list */
    for (const guess of guesses) {
      /* We'll calculate its score */
      const score = calculateGuessScore(guess, updatedGame);
      /* And set it to the guess */
      await prisma.guess.update({
        where: {
          id: guess.id,
        },
        data: {
          score,
        }
      });
    };

    /* Getting list of participants */
    const participants = await prisma.participant.findMany({})
    /* For each participant in the list */
    for (const participant of participants) {
      /* We'll get its accumulated score */
      const score = await prisma.guess.groupBy({
        by: ['participantId'],
        where: {
          participantId: participant.id,
        },
        _sum: {
          score: true,
        },
      });
      /* And set it to the participant */
      await prisma.participant.update({
        where: {
          id: participant.id,
        },
        data: {
          score: score[0]._sum.score ? score[0]._sum.score : 0,
        }
      });
    };

    // Returning updated game
    return { updatedGame };
  });
};
