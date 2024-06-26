import { Prisma } from "@prisma/client";

export type UserAuthorWithProfileInfo = Prisma.UserGetPayload<{
  include: {
    subscriptions: true;
    subscribers: true;
    posts: true;
    trainings: {
      include: {
        exercises: {
          include: {
            exercise: true;
          };
        };
      };
    };
  };
}>;

export type UserAuthorWithPosts = Prisma.UserGetPayload<{
  include: {
    posts: true;
  };
}>;

export type UserAuthorWithTrainings = Prisma.UserGetPayload<{
  include: {
    trainings: {
      include: {
        exercises: {
          include: {
            exercise: true;
          };
        };
      };
    };
  };
}>;
