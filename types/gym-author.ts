import { Prisma } from "@prisma/client";

export type GymAuthorWithProfileInfo = Prisma.GymGetPayload<{
  include: {
    subscribers: true;
    gymOpenTime: true;
    posts: true;
    trainers: true;
    gymMemberships: true;
    equipment: true;
    promotions: true;
    staff: {
      include: {
        user: true;
      };
    };
  };
}>;

export type GymAuthorWithPosts = Prisma.GymGetPayload<{
  include: {
    posts: true;
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
      };
    };
  };
}>;

export type GymWithSubscribers = Prisma.GymGetPayload<{
  include: {
    subscribers: true;
  };
}>;
