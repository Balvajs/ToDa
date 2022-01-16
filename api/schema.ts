import { gql } from 'apollo-server-micro';

export default gql`
  scalar DateTime
  scalar EmailAddress

  type Term {
    from: DateTime!
    to: DateTime!
  }

  type ContactDetails {
    firstName: String!
    lastName: String!
    email: EmailAddress!
  }

  input BookTermInput {
    from: DateTime!
    to: DateTime!
    firstName: String!
    lastName: String!
    email: EmailAddress!
    numberOfPersons: Int!
    note: String
  }

  type Booking {
    term: Term!
    contactDetails: ContactDetails!
    numberOfPersons: Int!
    note: String
  }

  type BookTermSuccess {
    booking: Booking!
  }

  union BookTermPayload = BookTermSuccess

  type Query {
    debug: Boolean!
  }

  type Mutation {
    bookTerm(input: BookTermInput!): BookTermPayload!
  }
`;
