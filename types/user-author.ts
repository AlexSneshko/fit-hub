import { Prisma } from "@prisma/client";

export type UserAuthorWithProfileInfo = Prisma.UserGetPayload<{
  include: {
    subscriptions: true;
    subscribers: true;
    exercises: true;
    posts: {
      include: {
        likes: true;
        comments: true;
      };
    };
  };
}>;

export type UserAuthorWithPosts = Prisma.UserGetPayload<{
  include: {
    posts: true;
  };
}>;
