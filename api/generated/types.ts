/* eslint-disable */
import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  EmailAddress: string;
};

export type BookTermInput = {
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  from: Scalars['DateTime'];
  lastName: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  numberOfPersons: Scalars['Int'];
  to: Scalars['DateTime'];
};

export type BookTermPayload = BookTermSuccess;

export type BookTermSuccess = {
  __typename?: 'BookTermSuccess';
  booking: Booking;
};

export type Booking = {
  __typename?: 'Booking';
  contactDetails: ContactDetails;
  note?: Maybe<Scalars['String']>;
  numberOfPersons: Scalars['Int'];
  term: Term;
};

export type ContactDetails = {
  __typename?: 'ContactDetails';
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTerm: BookTermPayload;
};

export type MutationBookTermArgs = {
  input: BookTermInput;
};

export type Query = {
  __typename?: 'Query';
  debug: Scalars['Boolean'];
};

export type Term = {
  __typename?: 'Term';
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BookTermInput: BookTermInput;
  BookTermPayload: ResolversTypes['BookTermSuccess'];
  BookTermSuccess: ResolverTypeWrapper<BookTermSuccess>;
  Booking: ResolverTypeWrapper<Booking>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ContactDetails: ResolverTypeWrapper<ContactDetails>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Term: ResolverTypeWrapper<Term>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BookTermInput: BookTermInput;
  BookTermPayload: ResolversParentTypes['BookTermSuccess'];
  BookTermSuccess: BookTermSuccess;
  Booking: Booking;
  Boolean: Scalars['Boolean'];
  ContactDetails: ContactDetails;
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Term: Term;
}>;

export type BookTermPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BookTermPayload'] = ResolversParentTypes['BookTermPayload'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<'BookTermSuccess', ParentType, ContextType>;
}>;

export type BookTermSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BookTermSuccess'] = ResolversParentTypes['BookTermSuccess'],
> = ResolversObject<{
  booking?: Resolver<ResolversTypes['Booking'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking'],
> = ResolversObject<{
  contactDetails?: Resolver<
    ResolversTypes['ContactDetails'],
    ParentType,
    ContextType
  >;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfPersons?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  term?: Resolver<ResolversTypes['Term'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ContactDetails'] = ResolversParentTypes['ContactDetails'],
> = ResolversObject<{
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  bookTerm?: Resolver<
    ResolversTypes['BookTermPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationBookTermArgs, 'input'>
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  debug?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type TermResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Term'] = ResolversParentTypes['Term'],
> = ResolversObject<{
  from?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  BookTermPayload?: BookTermPayloadResolvers<ContextType>;
  BookTermSuccess?: BookTermSuccessResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  ContactDetails?: ContactDetailsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Term?: TermResolvers<ContextType>;
}>;
