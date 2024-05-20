import { Exercise, Post, Subscription, User } from "@prisma/client";

export type UserAuthorWithProfileInfo = User & {
  subscribers: Subscription[];
  subscriptions: Subscription[];
  posts: Post[];
  exercises: Exercise[];
};

export type UserAuthorWithPosts = User & {
  posts: Post[];
};