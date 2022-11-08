import Fastify from "fastify";
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

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

    // Creating the oute to count the number of created pools
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
    })

    // Setting port and host
    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

// Running the server
bootstrap();
