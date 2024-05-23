import { Prisma } from "@prisma/client";

export type TrainingWithExercises = Prisma.TrainingGetPayload<{
  include: {
    exercises: {
        include: {
            exercise: true
        }
    };
  };
}>;
