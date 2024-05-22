import { Promotion } from "@prisma/client";

import { PromotionCard } from "./promotion-card";
import { GymAuthorWithPromotions } from "@/types/gym-author";

interface PromotionListProps {
  data: GymAuthorWithPromotions;
}

export const PromotionList = ({ data }: PromotionListProps) => {
  if (data.promotions.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Posts</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          data={promotion}
          authorName={data.username}
        />
      ))}
    </div>
  );
};
