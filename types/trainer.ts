import { Prisma } from "@prisma/client";

export type TrainerWithClients = Prisma.TrainerGetPayload<{
  include: {
    clients: {
      include: {
        client: true;
      };
    };
  };
}>;
