import { Prisma } from "@prisma/client";

export type GymWithOpenTime = Prisma.GymGetPayload<{
   include: {
    gymOpenTime: true
   }
}>