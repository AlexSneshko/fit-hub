import {
  Equipment,
  Exercise,
  Gym,
  GymMembership,
  GymOpenTime,
  Post,
  Promotion,
  Staff,
  Subscription,
  Trainer,
  User,
} from "@prisma/client";

export type UserAuthorWithProfileInfo = User & {
  subscribers: Subscription[];
  subscriptions: Subscription[];
  posts: Post[];
  exercises: Exercise[];
};

export type GymAuthorWithProfileInfo = Gym & {
  subscribers: Subscription[];
  gymOpenTime: GymOpenTime | null;
  posts: Post[];
  trainers: Trainer[];
  gymMemberships: GymMembership[];
  equipment: Equipment[];
  promotions: Promotion[];
  staff: Staff[];
};

export type AuthorWithProfileInfo =
  | UserAuthorWithProfileInfo
  | GymAuthorWithProfileInfo;

export type UserAuthorWithPosts = User & {
  posts: Post[];
};

export type GymAuthorWithPosts = Gym & {
  posts: Post[];
};

export type AuthorWithPosts = UserAuthorWithPosts | GymAuthorWithPosts;
