import { Prisma } from "@prisma/client";

export type UserWithSubsribers = Prisma.UserGetPayload<{
  include: {
    subscribers: true;
  };
}>;

export type UserWithClient = Prisma.UserGetPayload<{
  include: {
    client: true;
  };
}>;
