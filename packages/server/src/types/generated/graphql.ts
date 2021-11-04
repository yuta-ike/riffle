import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  Void: void;
};

export enum AccessLevel {
  Full = 'full',
  Meta = 'meta',
  None = 'none'
}

export type Book = {
  __typename?: 'Book';
  author: User;
  category: Category;
  collaborators: Array<Collaborator>;
  comments: Array<Comment>;
  createDate: Scalars['Date'];
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
  updateDate: Scalars['Date'];
  words: Array<Word>;
};

export enum BookType {
  Own = 'own',
  Shared = 'shared'
}

export enum Category {
  English = 'english',
  Japanese = 'japanese',
  Math = 'math',
  Science = 'science',
  SocialStudies = 'social_studies',
  Toefle = 'toefle',
  Toeic = 'toeic'
}

export type Collaborator = {
  __typename?: 'Collaborator';
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  joinDate: Scalars['Date'];
  requestDate: Scalars['Date'];
  role: Role;
  updateDate: Scalars['Date'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  stamps: Array<Stamp>;
  type: CommentType;
};

export enum CommentType {
  Default = 'default',
  Question = 'question'
}

export type DeleteCollaborator = {
  collaboratorId: Scalars['ID'];
  hardDelete: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type DeleteInput = {
  __typename?: 'DeleteInput';
  hardDelete: Maybe<Scalars['Boolean']>;
};

export type ForkInput = {
  bookId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteBook: Maybe<Scalars['Void']>;
  deleteBookComment: Maybe<Scalars['Void']>;
  deleteCollaborator: Maybe<Scalars['Void']>;
  deleteFriend: Maybe<Scalars['Void']>;
  deleteWord: Maybe<Scalars['Void']>;
  deleteWordComment: Maybe<Scalars['Void']>;
  deleteWordCommentStamp: Maybe<Scalars['Void']>;
  postApprove: Maybe<Scalars['Void']>;
  postBook: OwnedBook;
  postBookComment: Comment;
  postConnect: Profile;
  postFork: OwnedBook;
  postInvited: Maybe<Scalars['Void']>;
  postRequest: Maybe<Scalars['Void']>;
  postWord: Maybe<Word>;
  postWordComment: Maybe<Comment>;
  postWordCommentStamp: Maybe<Stamp>;
  postWordScore: Array<WordScore>;
  putBook: OwnedBook;
  putPreference: Collaborator;
  putWord: Maybe<Word>;
  putWordStatus: Maybe<Word>;
};


export type MutationDeleteBookArgs = {
  bookId: Scalars['ID'];
  input: DeleteInput;
};


export type MutationDeleteBookCommentArgs = {
  bookId: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationDeleteCollaboratorArgs = {
  collaboratorId: Scalars['ID'];
  input: DeleteCollaborator;
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationDeleteWordArgs = {
  input: DeleteInput;
  wordId: Scalars['ID'];
};


export type MutationDeleteWordCommentArgs = {
  commentId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationDeleteWordCommentStampArgs = {
  id: Scalars['ID'];
  stampId: Scalars['ID'];
};


export type MutationPostApproveArgs = {
  collaboratorId: Scalars['ID'];
  input: PostApproveInput;
};


export type MutationPostBookArgs = {
  input: PostBookInput;
};


export type MutationPostBookCommentArgs = {
  bookId: Scalars['ID'];
  input: PostBoolCommentInput;
};


export type MutationPostConnectArgs = {
  input: PostConnectInput;
};


export type MutationPostForkArgs = {
  bookId: Scalars['ID'];
  input: Maybe<ForkInput>;
};


export type MutationPostInvitedArgs = {
  bookId: Scalars['ID'];
  input: PostInvitedInput;
};


export type MutationPostRequestArgs = {
  bookId: Scalars['ID'];
  input: PostRequestInput;
};


export type MutationPostWordArgs = {
  bookId: Scalars['ID'];
  input: PostWordInput;
};


export type MutationPostWordCommentArgs = {
  input: PostWordCommentInput;
  wordId: Scalars['ID'];
};


export type MutationPostWordCommentStampArgs = {
  commentId: Scalars['ID'];
  input: PostWordCommentStampInput;
};


export type MutationPostWordScoreArgs = {
  bookId: Scalars['ID'];
  input: Maybe<WordScoreInput>;
};


export type MutationPutBookArgs = {
  bookId: Scalars['ID'];
  input: PutBookInput;
};


export type MutationPutPreferenceArgs = {
  collaboratorId: Scalars['ID'];
  input: PutPreferenceInput;
};


export type MutationPutWordArgs = {
  input: PutWordInput;
  wordId: Scalars['ID'];
};


export type MutationPutWordStatusArgs = {
  input: PutWordStatusInput;
  wordId: Scalars['ID'];
};

export type OwnedBook = {
  __typename?: 'OwnedBook';
  accessLevel: AccessLevel;
  book: Book;
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
  role: Role;
  type: BookType;
  updateDate: Scalars['Date'];
};

export type PostApproveInput = {
  approve: Scalars['Boolean'];
  collaboratorId: Scalars['ID'];
  id: Scalars['ID'];
};

export type PostBookInput = {
  category: Scalars['String'];
  description: Maybe<Scalars['String']>;
  title: Scalars['String'];
  words: Array<WordsInput>;
};

export type PostBoolCommentInput = {
  __typename?: 'PostBoolCommentInput';
  content: Scalars['String'];
  type: CommentType;
};

export type PostConnectInput = {
  connectCode: Scalars['String'];
};

export type PostInvitedInput = {
  accept: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type PostRequestInput = {
  id: Scalars['ID'];
};

export type PostWordCommentInput = {
  content: Scalars['String'];
  type: CommentType;
};

export type PostWordCommentStampInput = {
  stampTypeId: Maybe<Scalars['Int']>;
};

export type PostWordInput = {
  answer: Scalars['String'];
  order: Maybe<Scalars['Int']>;
  question: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  ownedBooks: Array<OwnedBook>;
  updateDate: Scalars['Date'];
  user: User;
};

export type PutBookInput = {
  category: Maybe<Category>;
  description: Maybe<Scalars['String']>;
  isFavorite: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
};

export type PutPreferenceInput = {
  collaboratorId: Scalars['ID'];
  id: Scalars['ID'];
  role: Role;
};

export type PutWordInput = {
  answer: Maybe<Scalars['String']>;
  order: Maybe<Scalars['Int']>;
  question: Maybe<Scalars['String']>;
};

export type PutWordStatusInput = {
  done: Maybe<Scalars['Boolean']>;
  flags: Maybe<Array<Scalars['Int']>>;
};

export type Query = {
  __typename?: 'Query';
  getConnectCode: Scalars['String'];
  getFriends: Array<Profile>;
  getInviteCode: Scalars['String'];
  getOwnedBook: OwnedBook;
  getOwnedBooks: Array<OwnedBook>;
};


export type QueryGetInviteCodeArgs = {
  bookId: Scalars['ID'];
};


export type QueryGetOwnedBookArgs = {
  bookId: Scalars['ID'];
};

export enum Role {
  Editor = 'editor',
  Owner = 'owner',
  Viewer = 'viewer'
}

export type Stamp = {
  __typename?: 'Stamp';
  author: User;
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  stampTypeId: Scalars['Int'];
  user: User;
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createDate: Scalars['Date'];
  iconUrl: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  ownedBooks: Array<OwnedBook>;
};

export type Word = {
  __typename?: 'Word';
  answer: Scalars['String'];
  author: User;
  comments: Array<Comment>;
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  question: Scalars['String'];
  updateDate: Scalars['Date'];
  wordDetail: WordDetail;
  wordScores: WordScore;
};

export type WordDetail = {
  __typename?: 'WordDetail';
  done: Scalars['Boolean'];
  flags: Array<Scalars['Int']>;
  id: Scalars['ID'];
};

export type WordScore = {
  __typename?: 'WordScore';
  book: Book;
  createDate: Scalars['Date'];
  id: Scalars['ID'];
  result: Scalars['Boolean'];
  word: Word;
  wordId: Scalars['Int'];
};

export type WordScoreInput = {
  __typename?: 'WordScoreInput';
  result: Scalars['Boolean'];
  wordId: Scalars['ID'];
};

export type WordsInput = {
  answer: Scalars['String'];
  question: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccessLevel: AccessLevel;
  Book: ResolverTypeWrapper<Book>;
  BookType: BookType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: Category;
  Collaborator: ResolverTypeWrapper<Collaborator>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentType: CommentType;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteCollaborator: DeleteCollaborator;
  DeleteInput: ResolverTypeWrapper<DeleteInput>;
  ForkInput: ForkInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OwnedBook: ResolverTypeWrapper<OwnedBook>;
  PostApproveInput: PostApproveInput;
  PostBookInput: PostBookInput;
  PostBoolCommentInput: ResolverTypeWrapper<PostBoolCommentInput>;
  PostConnectInput: PostConnectInput;
  PostInvitedInput: PostInvitedInput;
  PostRequestInput: PostRequestInput;
  PostWordCommentInput: PostWordCommentInput;
  PostWordCommentStampInput: PostWordCommentStampInput;
  PostWordInput: PostWordInput;
  Profile: ResolverTypeWrapper<Profile>;
  PutBookInput: PutBookInput;
  PutPreferenceInput: PutPreferenceInput;
  PutWordInput: PutWordInput;
  PutWordStatusInput: PutWordStatusInput;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  Stamp: ResolverTypeWrapper<Stamp>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  Word: ResolverTypeWrapper<Word>;
  WordDetail: ResolverTypeWrapper<WordDetail>;
  WordScore: ResolverTypeWrapper<WordScore>;
  WordScoreInput: ResolverTypeWrapper<WordScoreInput>;
  WordsInput: WordsInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Book: Book;
  Boolean: Scalars['Boolean'];
  Collaborator: Collaborator;
  Comment: Comment;
  Date: Scalars['Date'];
  DeleteCollaborator: DeleteCollaborator;
  DeleteInput: DeleteInput;
  ForkInput: ForkInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  OwnedBook: OwnedBook;
  PostApproveInput: PostApproveInput;
  PostBookInput: PostBookInput;
  PostBoolCommentInput: PostBoolCommentInput;
  PostConnectInput: PostConnectInput;
  PostInvitedInput: PostInvitedInput;
  PostRequestInput: PostRequestInput;
  PostWordCommentInput: PostWordCommentInput;
  PostWordCommentStampInput: PostWordCommentStampInput;
  PostWordInput: PostWordInput;
  Profile: Profile;
  PutBookInput: PutBookInput;
  PutPreferenceInput: PutPreferenceInput;
  PutWordInput: PutWordInput;
  PutWordStatusInput: PutWordStatusInput;
  Query: {};
  Stamp: Stamp;
  String: Scalars['String'];
  User: User;
  Void: Scalars['Void'];
  Word: Word;
  WordDetail: WordDetail;
  WordScore: WordScore;
  WordScoreInput: WordScoreInput;
  WordsInput: WordsInput;
}>;

export type BookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  category: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  collaborators: Resolver<Array<ResolversTypes['Collaborator']>, ParentType, ContextType>;
  comments: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  words: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollaboratorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Collaborator'] = ResolversParentTypes['Collaborator']> = ResolversObject<{
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  requestDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  role: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updateDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  author: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stamps: Resolver<Array<ResolversTypes['Stamp']>, ParentType, ContextType>;
  type: Resolver<ResolversTypes['CommentType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteInputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteInput'] = ResolversParentTypes['DeleteInput']> = ResolversObject<{
  hardDelete: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteBook: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteBookArgs, 'bookId' | 'input'>>;
  deleteBookComment: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteBookCommentArgs, 'bookId' | 'commentId'>>;
  deleteCollaborator: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteCollaboratorArgs, 'collaboratorId' | 'input'>>;
  deleteFriend: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteFriendArgs, 'friendId'>>;
  deleteWord: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteWordArgs, 'input' | 'wordId'>>;
  deleteWordComment: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteWordCommentArgs, 'commentId' | 'id'>>;
  deleteWordCommentStamp: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteWordCommentStampArgs, 'id' | 'stampId'>>;
  postApprove: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationPostApproveArgs, 'collaboratorId' | 'input'>>;
  postBook: Resolver<ResolversTypes['OwnedBook'], ParentType, ContextType, RequireFields<MutationPostBookArgs, 'input'>>;
  postBookComment: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationPostBookCommentArgs, 'bookId' | 'input'>>;
  postConnect: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationPostConnectArgs, 'input'>>;
  postFork: Resolver<ResolversTypes['OwnedBook'], ParentType, ContextType, RequireFields<MutationPostForkArgs, 'bookId'>>;
  postInvited: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationPostInvitedArgs, 'bookId' | 'input'>>;
  postRequest: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationPostRequestArgs, 'bookId' | 'input'>>;
  postWord: Resolver<Maybe<ResolversTypes['Word']>, ParentType, ContextType, RequireFields<MutationPostWordArgs, 'bookId' | 'input'>>;
  postWordComment: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationPostWordCommentArgs, 'input' | 'wordId'>>;
  postWordCommentStamp: Resolver<Maybe<ResolversTypes['Stamp']>, ParentType, ContextType, RequireFields<MutationPostWordCommentStampArgs, 'commentId' | 'input'>>;
  postWordScore: Resolver<Array<ResolversTypes['WordScore']>, ParentType, ContextType, RequireFields<MutationPostWordScoreArgs, 'bookId'>>;
  putBook: Resolver<ResolversTypes['OwnedBook'], ParentType, ContextType, RequireFields<MutationPutBookArgs, 'bookId' | 'input'>>;
  putPreference: Resolver<ResolversTypes['Collaborator'], ParentType, ContextType, RequireFields<MutationPutPreferenceArgs, 'collaboratorId' | 'input'>>;
  putWord: Resolver<Maybe<ResolversTypes['Word']>, ParentType, ContextType, RequireFields<MutationPutWordArgs, 'input' | 'wordId'>>;
  putWordStatus: Resolver<Maybe<ResolversTypes['Word']>, ParentType, ContextType, RequireFields<MutationPutWordStatusArgs, 'input' | 'wordId'>>;
}>;

export type OwnedBookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OwnedBook'] = ResolversParentTypes['OwnedBook']> = ResolversObject<{
  accessLevel: Resolver<ResolversTypes['AccessLevel'], ParentType, ContextType>;
  book: Resolver<ResolversTypes['Book'], ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFavorite: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  role: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['BookType'], ParentType, ContextType>;
  updateDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostBoolCommentInputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostBoolCommentInput'] = ResolversParentTypes['PostBoolCommentInput']> = ResolversObject<{
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['CommentType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ownedBooks: Resolver<Array<ResolversTypes['OwnedBook']>, ParentType, ContextType>;
  updateDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getConnectCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getFriends: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  getInviteCode: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGetInviteCodeArgs, 'bookId'>>;
  getOwnedBook: Resolver<ResolversTypes['OwnedBook'], ParentType, ContextType, RequireFields<QueryGetOwnedBookArgs, 'bookId'>>;
  getOwnedBooks: Resolver<Array<ResolversTypes['OwnedBook']>, ParentType, ContextType>;
}>;

export type StampResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stamp'] = ResolversParentTypes['Stamp']> = ResolversObject<{
  author: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stampTypeId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  comments: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  iconUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownedBooks: Resolver<Array<ResolversTypes['OwnedBook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type WordResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = ResolversObject<{
  answer: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  comments: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  question: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  wordDetail: Resolver<ResolversTypes['WordDetail'], ParentType, ContextType>;
  wordScores: Resolver<ResolversTypes['WordScore'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WordDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['WordDetail'] = ResolversParentTypes['WordDetail']> = ResolversObject<{
  done: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  flags: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WordScoreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['WordScore'] = ResolversParentTypes['WordScore']> = ResolversObject<{
  book: Resolver<ResolversTypes['Book'], ParentType, ContextType>;
  createDate: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  result: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  word: Resolver<ResolversTypes['Word'], ParentType, ContextType>;
  wordId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WordScoreInputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['WordScoreInput'] = ResolversParentTypes['WordScoreInput']> = ResolversObject<{
  result: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  wordId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Book: BookResolvers<ContextType>;
  Collaborator: CollaboratorResolvers<ContextType>;
  Comment: CommentResolvers<ContextType>;
  Date: GraphQLScalarType;
  DeleteInput: DeleteInputResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  OwnedBook: OwnedBookResolvers<ContextType>;
  PostBoolCommentInput: PostBoolCommentInputResolvers<ContextType>;
  Profile: ProfileResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Stamp: StampResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  Void: GraphQLScalarType;
  Word: WordResolvers<ContextType>;
  WordDetail: WordDetailResolvers<ContextType>;
  WordScore: WordScoreResolvers<ContextType>;
  WordScoreInput: WordScoreInputResolvers<ContextType>;
}>;

