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
    staff: {
      include: {
        user: true;
      }
    };
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

export type GymAuthorWithMemberships = Prisma.GymGetPayload<{
  include: {
    gymMemberships: true;
  };
}>;

export type GymAuthorWithEquipment = Prisma.GymGetPayload<{
  include: {
    equipment: true;
  };
}>;

export type GymAuthorWithStaff = Prisma.GymGetPayload<{
  include: {
    staff: {
      include: {
        user: true;
      }
    };
  };
}>;
