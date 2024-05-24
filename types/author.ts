import { Prisma } from "@prisma/client";
import { GymAuthorWithProfileInfo, GymAuthorWithPosts } from "./gym-author";
import { UserAuthorWithPosts, UserAuthorWithProfileInfo } from "./user-author";

export type AuthorWithProfileInfo =
  | UserAuthorWithProfileInfo
  | GymAuthorWithProfileInfo;

export type AuthorWithPosts = UserAuthorWithPosts | GymAuthorWithPosts;

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: {
    authorGym: true;
    authorUser: true;
  };
}>;
