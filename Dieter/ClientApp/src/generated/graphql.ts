import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  Date: any,
  Byte: any,
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any,
  /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTimeOffset: any,
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any,
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any,
  Decimal: any,
  Uri: any,
  Guid: any,
  Short: any,
  UShort: any,
  UInt: any,
  Long: any,
  BigInt: any,
  ULong: any,
  SByte: any,
};



export type AddCommentInput = {
  content: Scalars['String'],
};

export type AddIngredientInput = {
  calories: Scalars['Int'],
  description?: Maybe<Scalars['String']>,
  ingredientType: IngredientType,
  name: Scalars['String'],
  photoId?: Maybe<Scalars['ID']>,
};



export type Comment = {
   __typename?: 'Comment',
  author?: Maybe<User>,
  commentId?: Maybe<Scalars['ID']>,
  content?: Maybe<Scalars['String']>,
  publicationDate?: Maybe<Scalars['Date']>,
  rating?: Maybe<Rating>,
  recipe?: Maybe<Recipe>,
};





export type DieterMutation = {
   __typename?: 'DieterMutation',
  addComment?: Maybe<Comment>,
  addIngredient?: Maybe<Ingredient>,
  addRecipe?: Maybe<Recipe>,
  assignIngredient?: Maybe<IngredientRecipeType>,
  loginUser?: Maybe<User>,
  registerUser?: Maybe<User>,
};


export type DieterMutationAddCommentArgs = {
  authorUserId: Scalars['ID'],
  comment: AddCommentInput,
  recipeId: Scalars['ID']
};


export type DieterMutationAddIngredientArgs = {
  ingredient: AddIngredientInput
};


export type DieterMutationAddRecipeArgs = {
  authorUserId: Scalars['ID'],
  ingredientIds: Array<Maybe<Scalars['ID']>>,
  recipe: RecipeInput
};


export type DieterMutationAssignIngredientArgs = {
  ingredientId: Scalars['ID'],
  recipeId: Scalars['ID']
};


export type DieterMutationLoginUserArgs = {
  password: Scalars['String'],
  userName: Scalars['String']
};


export type DieterMutationRegisterUserArgs = {
  password: Scalars['String'],
  user: RegisterUserInput
};

export type DieterQuery = {
   __typename?: 'DieterQuery',
  getComment?: Maybe<Comment>,
  getComments?: Maybe<Array<Maybe<Comment>>>,
  getIngredient?: Maybe<Ingredient>,
  getIngredients?: Maybe<Array<Maybe<Ingredient>>>,
  getRecipe?: Maybe<Recipe>,
  getRecipes?: Maybe<Array<Maybe<Recipe>>>,
  getUser?: Maybe<User>,
  getUsers?: Maybe<Array<Maybe<User>>>,
};


export type DieterQueryGetCommentArgs = {
  commentId?: Maybe<Scalars['Int']>
};


export type DieterQueryGetCommentsArgs = {
  recipeId?: Maybe<Scalars['Int']>
};


export type DieterQueryGetIngredientArgs = {
  ingredientId?: Maybe<Scalars['Int']>
};


export type DieterQueryGetIngredientsArgs = {
  recipeId?: Maybe<Scalars['Int']>
};


export type DieterQueryGetRecipeArgs = {
  recipeId?: Maybe<Scalars['ID']>
};


export type DieterQueryGetRecipesArgs = {
  amount?: Maybe<Scalars['Int']>,
  calories?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};


export type DieterQueryGetUserArgs = {
  userId?: Maybe<Scalars['ID']>
};

export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
  VeryEasy = 'VERY_EASY',
  VeryHard = 'VERY_HARD'
}


export type Ingredient = {
   __typename?: 'Ingredient',
  calories?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  ingredientId?: Maybe<Scalars['ID']>,
  ingredientRecipes?: Maybe<IngredientRecipeType>,
  ingredientType?: Maybe<IngredientType>,
  name?: Maybe<Scalars['String']>,
  photo?: Maybe<Photo>,
};

export type IngredientRecipeType = {
   __typename?: 'IngredientRecipeType',
  ingredient?: Maybe<Ingredient>,
  ingredientId?: Maybe<Scalars['ID']>,
  recipe?: Maybe<Recipe>,
  recipeId?: Maybe<Scalars['ID']>,
};

export enum IngredientType {
  Dairy = 'DAIRY',
  Fish = 'FISH',
  Fruit = 'FRUIT',
  Grain = 'GRAIN',
  Meat = 'MEAT',
  Other = 'OTHER',
  Spice = 'SPICE',
  Vegetable = 'VEGETABLE'
}



export type Photo = {
   __typename?: 'Photo',
  image?: Maybe<Scalars['Byte']>,
  photoId?: Maybe<Scalars['ID']>,
};

export type Rating = {
   __typename?: 'Rating',
  downVotes?: Maybe<Scalars['Int']>,
  ratingId?: Maybe<Scalars['ID']>,
  upVotes?: Maybe<Scalars['Int']>,
};

export type Recipe = {
   __typename?: 'Recipe',
  author?: Maybe<User>,
  calories?: Maybe<Scalars['Int']>,
  comments?: Maybe<Comment>,
  description?: Maybe<Scalars['String']>,
  difficulty?: Maybe<Difficulty>,
  estTime?: Maybe<Scalars['Int']>,
  ingredientRecipes?: Maybe<IngredientRecipeType>,
  name?: Maybe<Scalars['String']>,
  photo?: Maybe<Photo>,
  rating?: Maybe<Rating>,
  recipeId?: Maybe<Scalars['ID']>,
  weight?: Maybe<Scalars['Int']>,
};

export type RecipeInput = {
  calories: Scalars['Int'],
  description?: Maybe<Scalars['String']>,
  difficulty: Difficulty,
  estTime?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  photoId?: Maybe<Scalars['ID']>,
  weight: Scalars['Int'],
};

export type RegisterUserInput = {
  email: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  sex?: Maybe<Sex>,
  userName: Scalars['String'],
};



export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE'
}





export type User = {
   __typename?: 'User',
  comments?: Maybe<Array<Maybe<Comment>>>,
  email?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastActive?: Maybe<Scalars['Date']>,
  lastName?: Maybe<Scalars['String']>,
  recipes?: Maybe<Array<Maybe<Recipe>>>,
  registrationDate?: Maybe<Scalars['Date']>,
  sex?: Maybe<Sex>,
  userId?: Maybe<Scalars['ID']>,
  userName?: Maybe<Scalars['String']>,
};


export type LoginUserMutationVariables = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type LoginUserMutation = (
  { __typename?: 'DieterMutation' }
  & { loginUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName' | 'email' | 'firstName' | 'lastName' | 'lastActive' | 'registrationDate' | 'sex'>
  )> }
);

export type AddIngredientMutationVariables = {
  ingredient: AddIngredientInput
};


export type AddIngredientMutation = (
  { __typename?: 'DieterMutation' }
  & { addIngredient: Maybe<(
    { __typename?: 'Ingredient' }
    & Pick<Ingredient, 'ingredientId'>
  )> }
);

export type RegisterUserMutationVariables = {
  password: Scalars['String'],
  user: RegisterUserInput
};


export type RegisterUserMutation = (
  { __typename?: 'DieterMutation' }
  & { registerUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId'>
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'DieterQuery' }
  & { getUsers: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName'>
    & { comments: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'content'>
    )>>> }
  )>>> }
);


export const LoginUserDocument = gql`
    mutation loginUser($username: String!, $password: String!) {
  loginUser(userName: $username, password: $password) {
    userId
    userName
    email
    firstName
    lastName
    lastActive
    registrationDate
    sex
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginUserGQL extends Apollo.Mutation<LoginUserMutation, LoginUserMutationVariables> {
    document = LoginUserDocument;
    
  }
export const AddIngredientDocument = gql`
    mutation addIngredient($ingredient: AddIngredientInput!) {
  addIngredient(ingredient: $ingredient) {
    ingredientId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddIngredientGQL extends Apollo.Mutation<AddIngredientMutation, AddIngredientMutationVariables> {
    document = AddIngredientDocument;
    
  }
export const RegisterUserDocument = gql`
    mutation registerUser($password: String!, $user: RegisterUserInput!) {
  registerUser(password: $password, user: $user) {
    userId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    document = RegisterUserDocument;
    
  }
export const UsersDocument = gql`
    query Users {
  getUsers {
    userId
    userName
    comments {
      content
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
  }