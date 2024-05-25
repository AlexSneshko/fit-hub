import { Prisma } from "@prisma/client";

export type TrainerWithClients = Prisma.TrainerGetPayload<{
  include: {
    clients: {
      include: {
        client: {
          include: {
            subscribers: true;
          };
        };
      };
    };
  };
}>;

export type TrainerWithTrainingsWithClients = Prisma.TrainerGetPayload<{
  include: {
    clients: {
      include: {
        client: true;
      };
    };
    user: {
      include: {
        trainings: true;
      };
    };
  };
}>;

export type TrainingWithSharedTrainingWithUser = Prisma.TrainingGetPayload<{
  include: {
    sharedTraining: {
      include: {
        user: true;
      };
    };
  };
}>;

export type TrainerWithUser = Prisma.TrainerGetPayload<{
  include: {
    user: true;
  };
}>;

export type TrainerWithUserWithGymTrainerRelationship = Prisma.TrainerGetPayload<{
  include: {
    user: true;
    gymsRelationShips: true;
  },
}>;
