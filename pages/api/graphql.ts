import { ApolloServer } from 'apollo-server-micro';
import { EmailAddressResolver, DateTimeResolver } from 'graphql-scalars';
import { NextApiHandler } from 'next';

import { Resolvers } from '../../lib/api/generated/types';
import schema from '../../lib/api/schema';

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Query: {
    debug: () => true,
  },
  Mutation: {
    bookTerm: (_, { input }) => {
      console.log(input);

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
