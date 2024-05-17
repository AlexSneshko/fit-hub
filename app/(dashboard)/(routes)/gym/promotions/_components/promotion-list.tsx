import { Promotion } from "@prisma/client";

import { PromotionCard } from "./promotion-card";

interface PromotionListProps {
  data: Promotion[];
}

export const PromotionList = ({
    data
}: PromotionListProps) => {
  return (<div>
    {data.map((promotion) => (
      <PromotionCard key={promotion.id} data={promotion} />
    ))}
  </div>);
};
