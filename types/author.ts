import { GymAuthorWithProfileInfo, GymAuthorWithPosts } from "./gym-author";
import { UserAuthorWithPosts, UserAuthorWithProfileInfo } from "./user-author";

export type AuthorWithProfileInfo =
  | UserAuthorWithProfileInfo
  | GymAuthorWithProfileInfo;

export type AuthorWithPosts = UserAuthorWithPosts | GymAuthorWithPosts;
