import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client';
import { ApolloServer } from 'apollo-server-micro';
import dayjs from 'dayjs';
import { EmailAddressResolver, DateTimeResolver } from 'graphql-scalars';
import { NextApiHandler } from 'next';
import validator from 'validator';

import { Resolvers } from '../../lib/api/generated/types';
import schema from '../../lib/api/schema';

import 'dayjs/locale/cs';

dayjs.locale('cs');

declare const process: {
  env: {
    SENDINBLUE_API_KEY: string;
    NEXT_PUBLIC_MAIL_RECEIVER: string;
    MAIL_CC: string;
  };
};

const sibApiInstance = new TransactionalEmailsApi();
sibApiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY,
);

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Query: {
    debug: () => true,
  },
  Mutation: {
    bookTerm: async (_, { input }) => {
      const { response } = await sibApiInstance.sendTransacEmail({
        replyTo: {
          email: validator.normalizeEmail(input.email) || '',
          name: `${validator.escape(input.firstName)} ${validator.escape(
            input.lastName,
          )}`,
        },
        to: [{ email: process.env.NEXT_PUBLIC_MAIL_RECEIVER }],
        cc: process.env.MAIL_CC.split(',').map((cc) => ({ email: cc })),
        params: {
          firstName: validator.escape(input.firstName),
          lastName: validator.escape(input.lastName),
          email: validator.escape(input.email),
          note: input.note ? validator.escape(input.note) : undefined,
          numberOfPersons: input.numberOfPersons,
          dateStart: dayjs(input.from).format('dddd D.M.YYYY'),
          dateEnd: dayjs(input.to).format('dddd D.M.YYYY'),
        },
        templateId: 1,
      });

      if (
        !response.statusCode ||
        response.statusCode < 200 ||
        response.statusCode >= 300
      ) {
        console.error(
          'Submitting email failed',
          'User input:',
          input,
          'Mailer response:',
          response,
        );
        throw new Error(JSON.stringify(response));
      }

      return {
        __typename: 'BookTermSuccess',
        booking: {
          term: {
            from: input.from,
            to: input.to,
          },
          contactDetails: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
          },
          numberOfPersons: input.numberOfPersons,
          note: input.note ?? null,
        },
      };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const startServer = apolloServer.start();

const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
