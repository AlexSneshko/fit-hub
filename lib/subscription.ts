import { auth } from "@clerk/nextjs";

import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const trainerSubscription = await db.trainerSubscription.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!trainerSubscription) {
    return false;
  }

  const isValid =
    trainerSubscription.stripePriceId &&
    trainerSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
