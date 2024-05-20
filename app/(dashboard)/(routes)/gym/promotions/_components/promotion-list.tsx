import { Promotion } from "@prisma/client";

import { PromotionCard } from "./promotion-card";
import { GymAuthorWithPromotions } from "@/types/gym-author";

interface PromotionListProps {
  data: GymAuthorWithPromotions;
}

export const PromotionList = ({
    data
}: PromotionListProps) => {
  return (<div>
    {data.promotions.map((promotion) => (
      <PromotionCard key={promotion.id} data={promotion} authorName={data.username} />
    ))}
  </div>);
};
