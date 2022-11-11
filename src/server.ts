import Fastify from "fastify";
import cors from '@fastify/cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import ShortUniqueId from 'short-unique-id';

// Creating connection on Prisma
const prisma = new PrismaClient({
    log: ['query'],
});

// Creating the server
async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    // Setting application CORS
    await fastify.register(cors, {
        origin: true,
    });

    // Creating the route to count the number of users
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();

        return { count };
    });

    // Creating the route to count the number of guesses
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();

        return { count };
    });
    
    // Creating the route to count the number of created pools
    fastify.get('/pools/count', async () => {
        // const pools = await prisma.pool.findMany({
        //     where: {
        //         code: {
        //             startsWith: 'R'
        //         }
        //     }
        // });
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

        await prisma.pool.create({
            data: {
                title, 
                code,
            }
        })

        return reply.status(201).send({ code });
    });

    // Setting port and host
    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

// Running the server
bootstrap();
