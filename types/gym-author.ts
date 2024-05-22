import { Prisma } from "@prisma/client";

export type GymAuthorWithProfileInfo = Prisma.GymGetPayload<{
  include: {
    subscribers: true;
    gymOpenTime: true;
    posts: {
      include: {
        likes: true;
        comments: true;
      };
    };
    trainers: true;
    gymMemberships: true;
    equipment: true;
    promotions: true;
    staff: true;
  };
}>;

export type GymAuthorWithPosts = Prisma.GymGetPayload<{
  include: {
    posts: {
      include: {
        likes: true;
        comments: true;
      };
    };
  };
}>;

export type GymAuthorWithPromotions = Prisma.GymGetPayload<{
  include: {
    promotions: true;
  };
}>;

export type GymAuthorwithMemberships = Prisma.GymGetPayload<{
  include: {
    gymMemberships: true;
  };
}>;
