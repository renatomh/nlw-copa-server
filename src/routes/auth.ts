import axios from 'axios';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', {
      onRequest: [authenticate]
  }, async (request) => {
    return { user: request.user};
  });
  
  fastify.post('/users', async (request, reply) => {
    const createUserBody = z.object({
      access_token: z.string(),
    })
    
    const { access_token } = createUserBody.parse(request.body);

    /* Getting data from the user's access token */
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(res => {
      /* If everything is ok, we return the data */
      return res.data;
    }).catch(err => {
      /* If an error occurs, we inform and return the request */
      console.log(err);
      return reply.status(401).send({
        message: "The access token is not valid."
      })
    });

    const userData = await userResponse;

    /* User info interface */
    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    /* Validating user info */
    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        }
      })
    };

    /* Generating user's token */
    const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '7 days',
    });

    return { token };
  });
};
