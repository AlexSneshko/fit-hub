import {
  Equipment,
  Gym,
  GymMembership,
  GymOpenTime,
  Post,
  Promotion,
  Staff,
  Subscription,
  Trainer,
} from "@prisma/client";

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

export type GymAuthorWithPosts = Gym & {
  posts: Post[];
};

export type GymAuthorWithPromotions = Gym & {
  promotions: Promotion[];
}
