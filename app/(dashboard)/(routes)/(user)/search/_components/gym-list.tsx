import { Gym } from "@prisma/client";

import { GymCard } from "./gym-card";
import { GymWithSubscribers } from "@/types/gym-author";
import { isUserSubcribed } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

interface GymListProps {
  data: GymWithSubscribers[];
}

export const GymList = ({ data }: GymListProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Gyms</h1>
      </div>
    );
  }

  return (
    <div>
      {data.map((gym) => (
        <GymCard
          key={gym.id}
          data={gym}
          isUserSubscribed={isUserSubcribed(gym, userId)}
        />
      ))}
    </div>
  );
};
