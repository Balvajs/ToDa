/* eslint-disable */
import type * as Types from '../lib/api/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BookTermMutationVariables = Types.Exact<{
  input: Types.BookTermInput;
}>;

export type BookTermMutation = {
  __typename?: 'Mutation';
  bookTerm: {
    __typename?: 'BookTermSuccess';
    booking: {
      __typename?: 'Booking';
      term: { __typename?: 'Term'; to: string; from: string };
    };
  };
};

export const BookTermDocument = gql`
  mutation BookTerm($input: BookTermInput!) {
    bookTerm(input: $input) {
      ... on BookTermSuccess {
        booking {
          term {
            to
            from
          }
        }
      }
    }
  }
`;
export type BookTermMutationFn = Apollo.MutationFunction<
  BookTermMutation,
  BookTermMutationVariables
>;

/**
 * __useBookTermMutation__
 *
 * To run a mutation, you first call `useBookTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookTermMutation, { data, loading, error }] = useBookTermMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookTermMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BookTermMutation,
    BookTermMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BookTermMutation, BookTermMutationVariables>(
    BookTermDocument,
    options,
  );
}
export type BookTermMutationHookResult = ReturnType<typeof useBookTermMutation>;
export type BookTermMutationResult = Apollo.MutationResult<BookTermMutation>;
export type BookTermMutationOptions = Apollo.BaseMutationOptions<
  BookTermMutation,
  BookTermMutationVariables
>;
